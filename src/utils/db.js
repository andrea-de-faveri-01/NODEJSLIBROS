//! LA LIBRERÍA QUE VAMOS A UTILIZAR PARA CUALQUIER COSA QUE TENGA QUE VER AUNQUE SEA MÍNIMAMENTE CON LA BASE DE DATOS SERÁ MONGOOSE

//! EN ESTE ARCHIVO CONECTARÉ CON LA BASE DE DATOS MEDIANTE UNA FUNCIÓN Y PARA ELLO NECESITO MONGOOSE

//? me traigo la librería mongoose
const mongoose = require("mongoose");

//? guardamos en una variable nuestro link a la base de datos para poder conectar.
const LINK_A_MI_BASE_DE_DATOS = process.env.DB_URL;

//? creamos la función que me conectará con la bbdd para poder exportarla y utilizarla en el index.js
const connectDB = async () => {

    //? intentamos conectarnos a la base de datos en el try, si no lo consigue sale por el catch
    try {
        //* mongoose.set("strctQuery", true) -> para evitar el warning en consola;
        mongoose.set("strictQuery", true);
        
        //! con la función connect de mongoose pasándole por parámatro el link de la base de datos conectaremos
        const db = await mongoose.connect(LINK_A_MI_BASE_DE_DATOS);

        //? extraemos un dato que queramos mostrar en el console.log()
        const { host } = db.connection;

        //? informamos de que la conexión ha ido guay
        console.log("Conectando con éxito en el host: " + host)

    } catch (error) {
       
        //? mensaje de error
        console.log("no me puedo conectar a la base de datos, comprueba este error bobo -> ", error);

    }

}

//! exportamos la función para que pueda ser utilizada desde cualqueir archivo, en este caso la ejecutaremos en el index.js
module.exports = { connectDB }