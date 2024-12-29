const User = require("../models/user.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { receiverId, message } = req.body;
        const foundSender = await User.findById(userId);
        const foundReceiver = await User.findById(receiverId);
        if (!foundSender || !foundReceiver) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const newMessage = new Message({
            senderId: foundSender._id,
            receiverId: foundReceiver._id,
            message: message
        });
        await newMessage.save();
        foundSender.message.push(newMessage._id);
        foundReceiver.message.push(newMessage._id);
        await foundSender.save();
        await foundReceiver.save();
        res.status(201).json({
            message: "Message sent"
        });
    }catch (error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

const getAllMessages = async (req, res) => {
    try {
        const userId = req.userId;
        const { friendId } = req.body;
        const foundUser = await User.findById(userId).populate("message");
        const foundFriend = await User.findById(friendId);
        if (!foundUser||!foundFriend) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const messages = foundUser.message.filter((message) => message.senderId == friendId || message.receiverId == friendId);
        res.status(200).json({
            messages
        });
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {sendMessage,getAllMessages};