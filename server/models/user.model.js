const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePhoto: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEWmvOd3wx2xgbP6-heFfS7-QPqV03G-IDMH45ix9aYw&s'
    },
    description:{
        type: String,
        default: ''
    },
    // message:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: "Mesage",
    //     default: []
    // },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    friendRequest: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
},{timestamps: true});

const User = mongoose.model('User',userSchema);

module.exports = User;