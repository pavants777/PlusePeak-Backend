const mongoose = require('mongoose');

const userSchmea = mongoose.Schema({
   name : {
    type : String,
    required : true,
    trim : true
   },
   email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: (value) => {
            const emailRegex = /^\S+@\S+\.\S+$/;
            return emailRegex.test(value);
        },
        message: "Invalid email format",
    },
  },
   password: {
    type: String,
    required: true,
    trim: true,
   },
});


const User = mongoose.model("User",userSchmea);

module.exports = User;

