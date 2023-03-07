//? me traigo todas las funciones de mi controlador
const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllLibros, getLibroById, getByTitle, crearLibro, eliminarLibro, eliminarLibroPorTitulo, actualizarLibro } = require("./libros.controller");

//! las rutas no pueden funcionar sin controladores

//? me traigo el router de express para poder gestionar mis rutas
const librosRoutes = require("express").Router();

//! aquí estamos llegando gracias al index.js utilizando el servidor para declarar la ruta principal que gestiona el resto de rutas que ya tenemos aquí, es decir, en el index.js -> server.use("/libros", librosRoutes);

//* declaro rutas y que ejecuta cada ruta en este caso la ruta / ejecuta la función declarada en el controlador getAllLibros
librosRoutes.get("/", getAllLibros);

//! utilizo middleware de si está logueado para dejarle ver un libro por id
librosRoutes.get("/:id", [isAuth], getLibroById);

librosRoutes.get("/getByTitle/:title", getByTitle);

//? uso de cloudinary
librosRoutes.post("/", [isAdmin], upload.single("caratula"),crearLibro);

librosRoutes.delete("/:idLibro",[isAuth], eliminarLibro);
librosRoutes.delete("/deleteByTitle/:titulo", [isAuth], eliminarLibroPorTitulo);
librosRoutes.put("/:id", [isAdmin], upload.single("caratula"), actualizarLibro);

//? exportamos las rutas para que puedan ser utilizadas por el servidor en el index.js
module.exports = librosRoutes;