const express = require("express")
const messageRouter = express.Router()

const {
    createUserMessage,
    getAllAdminMessagesFromAdmin,
    getMyMessages,
    getAdminMessages,
    getAllUserMessages,
    getUserMessageFromAdmin,
    replyToUserMessage} = require("../Controllers/messageController")
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isAdmin = require("../Middlewares/isAdmin")

messageRouter.post('/', isLoggedIn, createUserMessage);
messageRouter.get('/', isLoggedIn,  getAllUserMessages);
messageRouter.get('/admin/:userId', isLoggedIn,  getAllAdminMessagesFromAdmin);
messageRouter.get('/user-messages/:userId', isLoggedIn, getMyMessages);
messageRouter.get('/admin-messages/:userId', isLoggedIn, getAdminMessages);
messageRouter.get('/admin-user-message/:userId', isLoggedIn, getUserMessageFromAdmin);
messageRouter.post('/admin-reply', isLoggedIn, isAdmin, replyToUserMessage);

module.exports = messageRouter