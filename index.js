//? Funcionamiento del servidor
//! Rutas que usa nuestro servidor
//* Configuraciones


//* me traigo la librería dotenv para poder leer las variables que tenga en mi .env
//? #2
require("dotenv").config();

//? requiero las cors para permitir o denegar accesos a mi backend
const cors = require("cors");

//! me traigo cloudinary para todo el tema de subida de archivos
const cloudinary = require("cloudinary").v2;

//* creo la variable port y le doy el valor de la variable PORT que está en mi .env -> accediendo a ella mediante process.env.NOMBREVARIABLE
//? #2
const PUERTITO = process.env.PORT;


//! importo las rutas de mis controladores.
const librosRoutes = require("./src/api/libros/libros.routes");


//* Me traigo mi base de datos
//? #3
const db = require("./src/utils/db.js");

//* Estoy ejecutando la función connectDB de mi archivo db.js que se encuentra en ./src/utils/db.js
//? #3
db.connectDB();

//! CONFIGURACIÓN DE CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, 
})

//? me traigo la librería express para tener las opciones del servidor con express
//? #1 p1
const express = require("express");
const AutoresRoutes = require("./src/api/autores/autores.routes");
const userRoutes = require("./src/api/users/user.routes");

//? ejecuto la variable express que tiene todo lo de la librería y lo guardo en mi variable server, de esta manera tendré un montón de funciones que podré ejecturar para que realice mi servidor
//? #1 p2
const server = express();

//! necesito utilizar las cors
server.use(cors());

//! MIDDLEWARES PARA EL FUNCIONAMIENTO DEL BODY DE LA PETICION (PARA SABER INTERPRETARLO)
server.use(express.json());
server.use(express.urlencoded({extended: true}));

//! una ruta que usa mi servidor para indicarme que /libros va a gestionar las rutas de librosRoutes
server.use("/libros", librosRoutes);
server.use("/autores", AutoresRoutes);
server.use("/users", userRoutes);

//? Una función que ejecuta mi servidor, en este caso para utilizar una ruta para mostrar algo o para enrutar de otra manera
//! #1 p4


//! controlador de errores recibe 4 parámetros, err -> error, req -> petición, res -> respuesta, next -> pasar a lo siguiente
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || "Error inesperado");
});

server.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
})

server.use("/", (req, res) => {

    res.send("Funcionando")

});

//? Otra función que ejecuta mi servidor, en este caso para "levantarse" o "escuchando", es decir, que sea accesible
//? #1 p3
//? #2 -> PUERTITO USO DEL ENV
server.listen(PUERTITO, () => {

    console.log("El servidor está furrulando http://localhost:" + PUERTITO);

});