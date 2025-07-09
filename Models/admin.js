const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"]
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  image: {
    type: String,
    // required: true,
    dafualt: ""
  },
  role: {
    type: String,
    // enum: ["buyer", "seller", "admin"],
    default: "admin"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken:{
    type: String
  },
  verificationExp:{
    type: String
  }
})

const adminModel = mongoose.model("Admin", adminSchema)

module.exports = adminModel