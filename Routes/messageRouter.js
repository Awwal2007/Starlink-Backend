const express = require("express")
const messageRouter = express.Router()

const {
    createUserMessage,
    getAllMessages,
    getMyMessages,
    getAdminMessages,
    getUserMessageFromAdmin,
    replyToUserMessage} = require("../Controllers/messageController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isAdmin = require("../Middlewares/isAdmin")

messageRouter.post('/', isLoggedIn, createUserMessage);
messageRouter.get('/', isLoggedIn,  getAllMessages);
messageRouter.get('/user-messages', isLoggedIn, getMyMessages);
messageRouter.get('/admin-messages/:userId', isLoggedIn, getAdminMessages);
messageRouter.get('/admin-user-message/:userId', isLoggedIn, getUserMessageFromAdmin);
messageRouter.post('/admin-reply', isLoggedIn, isAdmin, replyToUserMessage);

module.exports = messageRouter