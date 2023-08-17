const express = require("express");
const user_route = express();
const path = require("path");
const session = require("express-session");

const config = require("../config/config")
user_route.use(session({secret:config.sessionSercret}));

const auth = require("../middleware/auth");

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

user_route.get("/register",auth.isLogout,userController.loadRegister);

user_route.post("/register",userController.insertUser);

user_route.get("/login",auth.isLogout,userController.loginLoad);

user_route.post("/login",userController.logined);

user_route.get("/home",auth.isLogin,userController.homeLoad);

user_route.get("/logout",auth.isLogin,userController.UserLogout);

 module.exports = user_route;