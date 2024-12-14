const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user.route.js')
const authRoute = require('./routes/auth.route.js')

const dotenv = require('dotenv')
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.Mongo_Url)
.then(
    () =>console.log("mongodb is connected")
).catch(
    (error) => console.log(error)
)

const port = 8000;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

app.use('/auth',authRoute);
app.use('/user',userRoute);