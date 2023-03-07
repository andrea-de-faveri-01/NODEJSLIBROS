const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema( 
    {
        email: {type: String, unique: true, trim: true, required: true},
        password: {type: String, trim: true, required: true},
        librosFavoritos: [{type: mongoose.Types.ObjectId, ref: "libros"}],
        rol: {type: String, default: "user", enum: ["admin", "user"], required: true},
        edad: {type: Number}
    }
);

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;