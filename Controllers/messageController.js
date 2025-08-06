const Message = require("../Models/message");

// Create a new user message
const createUserMessage = async (req, res, next) => {
  try {
    const messageData = {
      ...req.body,
      userId: req.user?._id,
      userName: req.user.name
    };

    const newMessage = await Message.create(messageData);

    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      newMessage
    });
  } catch (error) {
    console.error("Create User Message Error:", error);
    next(error);
  }
};

// Get all messages (admin or support role ideally)
const getAllAdminMessagesFromAdmin = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const messages = await Message.find({sender: "user", userId: userId}).sort({ createdAt: -1 });
    if(!messages){
      return res.status(400).json({
        status: "success",
        message: "No message found",
      })
    }
    res.status(200).json({
      status: "success",
      message: messages.length > 0 ? "Admin messages loaded" : "No message sent yet",
      data: messages
    });
  } catch (error) {
    console.error("Get All Messages Error:", error);
    res.send(error)
    next(error);
  }
};
const getAllUserMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({sender: "user", }).sort({ createdAt: -1 });
    if(!messages){
      return res.status(400).json({
        status: "success",
        message: "No message found",
      })
    }
    res.status(200).json({
      status: "success",
      message: messages.length > 0 ? "Admin messages loaded" : "No message sent yet",
      data: messages
    });
  } catch (error) {
    console.error("Get All Messages Error:", error);
    res.send(error)
    next(error);
  }
};

const getUserMessageFromAdmin = async (req, res, next) => {
    const userId = req.params.userId;
    
    try {
        const messages = await Message.find({userId: userId})
        if(!userId){
            return res.status(401).json({
                status: "error",
                message: "userId is required"
            })
        }
        if(!messages){
            return res.status(401).json({
                status: "error",
                message: "user not found is required"
            })
        }
        res.status(201).json({
            status: "success",
            message: messages.length > 0 ? "user messages" : "No messages yet",
            data: messages
        })
    } catch (error) {
        console.log(error);
        next(error);        
        console.log('userId from route:', userId);
        res.send({ userId });
    }
};

// Get messages for the logged-in user
const getMyMessages = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ userId: userId }).sort({ createdAt: 1 });
    if (!userId) {
      return res.status(400).json({
        status: "error",
        message: "userId is required"
      });
    }
    res.status(200).json({
      status: "success",
      message: messages.length > 0 ? "Your messages" : "No messages yet",
      data: messages
    });
  } catch (error) {
    console.error("Get User Messages Error:", error);
    next(error);
  }
};

// Get messages for the admin (sent replies)
const getAdminMessages = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({ sender: "admin", replyTo: userId  }).sort({ createdAt: -1 });

    if(!messages){
        return res.status(404).json({
            status: "error",
            message: "admin message not found",
        })
    }

    res.status(201).json({
        status: "success",
        message: messages.length > 0 ? "Admin messages loaded" : "No replies sent yet",
        data: messages
    })
    
    
  } catch (error) {
    console.error("Get Admin Messages Error:", error);
    next(error);
  }
};

// Admin replies to a user message
const replyToUserMessage = async (req, res, next) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        status: "error",
        message: "Both message and userId are required"
      });
    }

    const reply = await Message.create({
      message,
      userId: req.user?._id,
      sender: "admin",
      userName: req.user?.name,
      replyTo: userId
    });

    res.status(201).json({
      status: "success",
      message: "Reply sent successfully",
      data: reply
    });
  } catch (error) {
    console.error("Reply to User Message Error:", error);
    next(error);
  }
};

module.exports = {
  createUserMessage,
  getAllAdminMessagesFromAdmin,
  getMyMessages,
  getAdminMessages,
  replyToUserMessage,
  getUserMessageFromAdmin,
  getAllUserMessages
};