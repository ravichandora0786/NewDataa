const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/User_manager");

const express = require("express");
const app = express();


//user routs

const userRouts = require('./routes/userRouter');
app.use("/",userRouts);


//admin routs

const adminRoute = require('./routes/adminRouter');
app.use("/admin",adminRoute);

app.listen(3002,  function(){
    console.log("Server start");
});