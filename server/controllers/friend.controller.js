const User = require('../models/user.model');

const getAllFriend = async (req, res) => {
    try {
        const userId = req.userId; 
        const foundUser = await User.findById(userId).populate('friends');
        if (!foundUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const friendList = foundUser.friends;
        res.status(200).json({
            friends: friendList
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// TODO having admin access remove it
const addFriend = async (req, res) => {
    try {
        const { friendEmail, userId } = req.body;

        const foundFriend = await User.findOne({ email: friendEmail });
        if (!foundFriend) {
            return res.status(404).json({
                message: "Friend not found"
            });
        }

        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (foundUser.friendRequest.includes(foundFriend.id)) {
            return res.status(400).json({
                message: "Friend request already sent"
            });
        }

        foundFriend.friendRequest.push(foundUser.id);
        await foundFriend.save();

        res.status(200).json({
            message: "Friend request sent successfully"
        });

    } catch (error) {
        console.error("Error adding friend:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const acceptRequest = async(req,res) => {
    try {
        const { friendId, userId } = req.body;
    
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        

        const foundFriend = await User.findById(friendId);
        if (!foundFriend) {
            return res.status(404).json({
                message: "Friend not found",
            });
        }
    
    
        if (foundUser.friends.includes(foundFriend.id)) {
            return res.status(400).json({
                message: "Friend already exist"
            });
        }
    
        if (!foundUser.friendRequest.includes(foundFriend.id)) {
            return res.status(400).json({
                message: "Friend Request not present"
            });
        }
    
        foundUser.friendRequest = foundUser.friendRequest.filter((i)=>i.toString()!=friendId);
        foundUser.friends.push(foundFriend.id);
        // foundUser.friendRequest.remove(foundFriend.id);
        await foundUser.save();
    
        foundFriend.friends.push(foundUser.id);
        await foundFriend.save();
    
        res.status(200).json({
            message: "Friend request sent successfully"
        });
    
    } catch (error) {
        console.error("Error adding friend:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
    
}


module.exports = {getAllFriend,addFriend,acceptRequest};