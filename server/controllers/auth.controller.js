const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const errorHandler = require('../utils/error.js');
const jwt = require('jsonwebtoken');
const {z} = require('zod');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ message: 'Token is missing!' });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedData) {
            req.userId = decodedData.userId;
            next(); 
        } else {
            return res.status(400).json({ message: 'Invalid token' }); 
        }

    } catch (error) {
        return res.status(400).json({ message: 'Authentication failed', error: error.message });
    }
};

const me = async(req,res,next) =>{
    const userId = req.userId;
    try {
        const foundUser = await User.findById(userId);
        
        if (!foundUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
    
        const { password, ...rest } = foundUser._doc;
    
        res.status(200).json({
            foundUser: rest
        });
    
    } catch (e) {
        console.error(e); 
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message 
        });
    }
}

const findUser = async (req, res, next) => {
    const userId = req.body.userId;
    
    try {
        const foundUser = await User.findById(userId);
        
        if (!foundUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const { password, ...rest } = foundUser._doc;

        res.status(200).json({
            foundUser: rest
        });

    } catch (e) {
        console.error(e); 
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message 
        });
    }
};

const signup = async (req, res, next) => {
    const requiredBody = z.object({
        userName: z.string().min(3).max(100),
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30)
    })

    const parseData = requiredBody.safeParse(req.body);

    if(!parseData.success){
        res.status(400).json({
            message:"Incorrect format",
            error: parseData.error
        })
    }
    
    const { userName, email, password } = req.body;

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
        rest.token = token;
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

module.exports = { signup, signin, google ,auth ,findUser ,me};