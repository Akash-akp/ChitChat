const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
})