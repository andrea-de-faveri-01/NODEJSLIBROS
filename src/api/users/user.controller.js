const User = require("./user.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const registro = async (req, res, next) => {

    try {
        
        if (req.body.rol === "admin") {
           req.body.rol = "user";
        }
        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json(newUser);
        
    } catch (error) {
        next(error);
    }

}

//? funcion modificar usuario
//! [isAdmin] -> yo no puedo ejecutar esta función si no soy admin.
// 1 caso -> cuando esto lo ejecuta una persona que está logueada y registrada y no es admin
// 2 caso -> cuando esto lo ejecuta una persona que está logueada y registrada y es admin

//! -> req.user -> .rol === "admin"

/* if (no eres admin) {
    no puedes modificar mi campo rol
} */

const modifyUser = async (req, res, next) => {

    try {
        
        //! recojo el id DE EL USUARIO QUE QUIERO MODIFICAR, es decir el id de Edu modificará el registro Edu.
        const { id } = req.params;

        const userToUpdate = new User(req.body);
         
        //! COMPROBACIÓN DEL ROL DEL USUARIO QUE REALIZA LA PETICIÓN -> yo siendo Santi(admin) puedo modificar a edu, por lo tanto, sólo dejaré que los admins puedan ponerle el campo rol de edu a admin, si no, en caso de que Edu sea user, no podrá ponerse el mismo a admin.
        if (req.user.rol !== "admin") {
            req.body.rol = "user";
       }

        //? QUIERO comprobar si la persona que está modificando al usuario es o el propio usuario o en todo caso un admin, en caso contrario no voy a dejar que lo actualice, en el if de abajo, pero para ello, necesito poder comparar el ID que me viene por parámetros (ID DEL USER A MODIFICAR) con el ID de la persona que está realizando la petición.

        //* El problema es que req.user._id me trae el objetId de mongo, entonces tengo que parsearlo para quedarme con lo que me interesa, lo paso a string en la siguiente línea y me queda esto: '"id"'
        const idUser = JSON.stringify(req.user._id);

        //* como tengo '"id"' y quiero sólo el 'id' entonces tengo que quitar las comillas de fuera.
        const idUserParsed = idUser.slice(1, idUser.length - 1);

        //! idUserParsed es el ID del usuario que realiza la petición e id es el ID del usuario que quiero modificar, por lo tanto, si son iguales O el que hace la petición es un admin entonces les dejaré actualizar el usuario.
        if (idUserParsed === id || req.user.rol === "admin") {

            userToUpdate._id = id;
            
            //? ACTUALIZO

            const userUpdated = await User.findByIdAndUpdate(id, userToUpdate, {new: true});
            return res.json(userUpdated);

        } else {
            return res.json("No puedes modificar un usuario que no seas tu mismo a no ser que seas admin");
        }  

    } catch (error) {
        return next(error)
    }

}

const login = async (req, res, next) => {

    try {
        
        //? tiene que comparar lo que le envío con lo que tengo registrado en la bbdd
        //* req.body.email es el email del usuario que quiere loguearse
        //* req.body.password es la contraseña del usuario que quiere loguearse

        //! consultar en la bbdd nuestro usuario
        const userToLog = await User.findOne({email: req.body.email});

        if (!userToLog) {
            return res.status(500).json("No se encuentra ese usuario")
       }

        if (bcrypt.compareSync(req.body.password, userToLog.password)) {
            const token = generateSign(userToLog._id, userToLog.email);
            return res.status(200).json({token: token, user: userToLog});
        } else {
            return res.status(500).json("Te has equivocado de contraseña máquina");
        }

   } catch (error) {
        next(error)
    }

}

module.exports = { registro, login, modifyUser }