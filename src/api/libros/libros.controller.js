//! me traigo el modelo de los libros para poder acceder a la colección y manipular los datos
const { deleteFile } = require("../../middlewares/delete");
const Libro = require("./libros.model");

//? declaro funciones que hacen cosas

const getAllLibros = async (req, res, next) => {
  // intenta
  try {
    //* intenta recoger de mi bbdd todos los libros
    const libros = await Libro.find();
    return res.json(libros);
  } catch (error) {
    // no funcionó
    return next(error);
  }
};

const getLibroById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const libro = await Libro.findById(id);

    if (!libro) {
      return res.json("No he podido encontrar el libro, ese id no existe");
    }

    return res.json(libro);
  } catch (error) {
    return next(error)
  }
};

const getByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;

    const libro = await Libro.findOne({ titulo: title });

    if (!libro) {
      return res.json("No he podido encontrar el libro, ese id no existe");
    }

    return res.json(libro);
  } catch (error) {
    return next(error)
  }
};

const crearLibro = async (req, res, next) => {

  try {

    const newLibro = new Libro(req.body);

    if (req.file) {
      newLibro.caratula = req.file.path;
    }

    await newLibro.save();

    return res.json(newLibro);

  } catch (error) {
    return next(error)
  }

}

const eliminarLibro = async (req, res, next) => {

  try {
    
    const { idLibro } = req.params;

    const libroEliminado = await Libro.findByIdAndDelete(idLibro);
    // findOne solo va a quedarse con el primer libro en la bbdd que cumpla con el campo del filtro -> cuyo libro tenga 43 en el campo precio;

    return res.status(200).json(libroEliminado);


  } catch (error) {
    return next(error)
  }

}

const eliminarLibroPorTitulo = async (req, res, next) => {

  try {
    
    const { titulo } = req.params;

    const libroEliminado = await Libro.findOneAndDelete({titulo: titulo});
    // findOne solo va a quedarse con el primer libro en la bbdd que cumpla con el campo del filtro -> cuyo libro tenga 43 en el campo precio;

    return res.status(200).json(libroEliminado);


  } catch (error) {
    return next(error)
  }

}

const actualizarLibro = async (req, res, next) => {

  try {
    
    //? registro -> identificador (que registro actualizar) -> el contenido nuevo (req.body)

    const { id } = req.params;

    //const libroAActualizar = new Libro(req.body);
    //libroAActualizar._id = id;

    if (req.file) {
      const oldLibro = await Libro.findById(id);
      if (oldLibro.caratula) {
        deleteFile(oldLibro.caratula);
      }
      req.body.caratula = req.file.path;
    }
    
    const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, {new: true});

    //! mirar por qué no pasa por la valiación del modelo con el findByIdAndUpdate

    return res.status(200).json(libroActualizado);

  } catch (error) {
    return next(error)
  }

}

//? exporto esas funciones

module.exports = {
  getAllLibros,
  getLibroById,
  getByTitle,
  crearLibro,
  eliminarLibro,
  eliminarLibroPorTitulo,
  actualizarLibro
};
