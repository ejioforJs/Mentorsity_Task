const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: emailValidator.validate,
        },
      },
      password: {
        type: String,
        required: true,
      },
})

const User = mongoose.model("User", userSchema);
module.exports = User;