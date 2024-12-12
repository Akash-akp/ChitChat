const express = require("express");
const app = express();

const middleware = (req,res,next)=>{
    return next();
}

app.use(middleware);

const port = 8000;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})