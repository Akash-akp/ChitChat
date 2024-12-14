const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    console.log(req.body);
    const { userName, email, password } = req.body;
    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json("SignUp successful");
    } catch (error) {
        next(error);  // Proper error forwarding
    }
};

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "Invalid Credentials"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Credentials"));
        }
        const token = jwt.sign(
            { userId: validUser._id }, process.env.JWT_SECRET
        );
        validUser.message = "Logged in";
        const { password: pass, ...rest } = validUser._doc;
        res.status(200)
            // .cookie('access token', token, {
            //     httpOnly: true,
            // })
            .json(rest);
    } catch (error) {
        next(error);  // Proper error forwarding
    }
};

const google = async (req, res, next) => {
    const { name, email, image } = req.body;
    try {
        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            const token = jwt.sign({ id: alreadyUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = alreadyUser._doc;
            return res.status(200)
                .cookie('access token', token, {
                    httpOnly: true,
                })
                .json(rest);
        } else {
            const generatePassword = Math.random().toString().slice(-8) + Math.random().toString().slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword);
            const newUser = new User({ userName: name, email, password: hashedPassword, profilePhoto: image });
            const updatedUser = await newUser.save();
            const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = updatedUser._doc;
            return res.status(200)
                .cookie('access token', token, {
                    httpOnly: true,
                })
                .json(rest);
        }
    } catch (error) {
        next(error);  // Proper error forwarding
    }
};

module.exports = { signup, signin, google };