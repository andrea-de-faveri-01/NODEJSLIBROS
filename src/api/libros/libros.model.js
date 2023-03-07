//? Me traigo mongoose porque voy a referenciar a una colección de mi bbdd
const mongoose = require("mongoose");

//! comenzamos la creación de nuestro Schema -> le indicamos los parámetros que debe seguir para crear un libro
const libroSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    caratula: { type: String, required: true },
    precio: { type: Number, required: true },
    ISBN: { type: String },
    categoria: {
      type: String,
      required: true,
      enum: ["aventura", "miedo", "policiaca", "pepe"],
    },
  },
  {
    timestamps: true,
    collection: "libros"
  }
);

const Libro = mongoose.model("libros", libroSchema);
module.exports =  Libro;
