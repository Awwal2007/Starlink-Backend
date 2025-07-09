const express = require("express")
const downloadRouter = express.Router()

const {download} = require("../Controllers/downloadController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
// const isAdmin = require("../Middlewares/isAdmin")

downloadRouter.get('/', isLoggedIn, download);

module.exports = downloadRouter