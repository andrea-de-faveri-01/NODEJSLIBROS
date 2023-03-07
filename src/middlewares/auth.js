const User = require("../api/users/user.model");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {

    try { 
        
          //? recogemos la autorización de los headers de la petición
          const token = req.headers.authorization;
          
          //*  si no tiene ese campo entonces significa que no está logueado, pues no le dejo pasar
          if (!token) {
          return res.json("No estás autorizado crack");
          }
          //* de tener token tenemos que comprobar que sea válido, para ello, necesitamos sólo el token, pero la autorización me escribe Bearer dkfjlasdfj, por lo tanto, quitamos el Bearer*espacio*
        const parsedToken = token.replace("Bearer ", "");
         
        //* verificamos si el token es correcto, es decir, si la llave la he creado yo.
        const validToken = verifyJwt(parsedToken);

        //* una vez comporbado buscamos el usuario en la bbdd por su id, el id me devuelve el validToken
        const userLogued = await User.findById(validToken.id);

        //! pongo su contraseña a null
        userLogued.password = null;
        //! pondremos al usuario en la petición req.user 
        req.user = userLogued;
        //! abrimos la puerta, o mejor dicho continuamos con el siguiente middleware o función
          next();
           
    } catch (error) {
        return res.json(error);
    }

}

const isAdmin = async (req, res, next) => {

    try {
        
        const token = req.headers.authorization;

        if (!token) {
            return res.json("No estás autorizado crack");
        }

        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyJwt(parsedToken);
        const userLogued = await User.findById(validToken.id);

        //! comprobamos si el rol del usuario que me ha puesto la autorización en los headers es de un admin.
        if (userLogued.rol === "admin") {
            //! abrir la puerta
            userLogued.password = null;
            req.user = userLogued;
            next();
        } else {
            return res.json("A donde vas máquina, no eres admin");
        }

    } catch (error) {
        return res.json(error);
    }

}

module.exports = {isAuth, isAdmin}