const { isAuth } = require("../../middlewares/auth");
const { registro, login, modifyUser } = require("./user.controller");
const userRoutes = require("express").Router();

userRoutes.post("/", registro);
userRoutes.post("/login", login);
userRoutes.put("/:id", [isAuth], modifyUser);

module.exports = userRoutes;