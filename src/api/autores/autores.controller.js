const Autor = require("./autores.model");

const postAutor = async (req, res, next) => {

    try {

        const newActor = await new Autor(req.body);
        await newActor.save();

        return res.status(201).json(newActor);

    } catch (error) {
        return next(error)
    }

}

const getAutores = async (req, res, next) => {

    try {

        //! me vas a traer los datos que tenga en el campo libros con el populate (que va a buscar los datos de los libros que tengan los ids que tenemos en el array de libros)
        //* MUY IMPORTANTE, EL LIBROS QUE LE PONGO DENTRO DEL POPULATE HACE REFERENCIA AL CAMPO DEL MODELO QUE QUIERO POPULAR -> EL NOMBRE DE LA CLAVE DECLARADA EN EL MODELO DE AUTORES EN ESTE CASO
        const autores = await Autor.find().populate("libros");

        //? si quisieramos popular los libros y de los libros otro dato, es decir, un populate dentro de un populate, la sintaxis sería la siguiente ->
        //* .find().populate({path: "libros", populate: {path: "dato"}});

        //? si quisieramos traernos los datos de los libros y los datos de las editoriales de los autores y están al mismo nivel entonces seguiremos una de estas maneras
        //* .find().populate("libros").populate("editoriales");
        //* .find().populate("libros editoriales");

        return res.json(autores);
        
    } catch (error) {
        return next(error);
    }

}

module.exports = { postAutor, getAutores }
