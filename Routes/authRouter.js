const express = require("express")
const authRouter = express.Router()
const {signup, login, adminLogin, adminSignUp, verifyEmail} = require("../Controllers/authController")
const uploadAuthImage = require("../Config/authMulter")
const isVerified = require("../Middlewares/isVerified")

authRouter.post("/signup", uploadAuthImage.single("profilePicture"), signup)
authRouter.post("/admin-signup", uploadAuthImage.single("profilePicture"), adminSignUp)
authRouter.post("/login",  login, isVerified)
authRouter.post("/admin-login",  adminLogin, isVerified)
authRouter.post("/verify/:token", verifyEmail)

module.exports = authRouter