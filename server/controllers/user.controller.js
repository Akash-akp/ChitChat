const User = require("../models/user.model");

const putDescription = async (req, res) => {
    try {
        const id = req.userId;
        const { description } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { description },
            { new: true, runValidators: true } // Ensures updated document is returned
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Description updated", description: updatedUser.description });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { putDescription };