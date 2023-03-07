const jwt = require("jsonwebtoken");

//! PARA GENERAR TOKENS Y COMPROBARLOS NECESITAMOS UNA VARIABLE SECRETA DE LA QUE PARTIR PARA GENERAR EL TOKEN

const generateSign = (id, email) => {

    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '30d' });

}

const verifyJwt = (token) => {

    return jwt.verify(token, process.env.JWT_SECRET);

}

module.exports = { generateSign, verifyJwt }