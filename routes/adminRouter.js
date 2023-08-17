const express = require("express");
const admin_route = express();

const session = require("express-session");
const config = require("../config/config");
admin_route.use(session({secret:config.sessionSercret}));


const bodyparser = require("body-parser")

admin_route.use(bodyparser.json());
admin_route.use(bodyparser.urlencoded({extended:true}));

admin_route.set("view engine","ejs");
admin_route.set("views","./views/admin");

const auth = require("../middleware/adminauth");

const adminController = require("../controllers/adminController");

admin_route.get("/",auth.isLogout,adminController.loadlogin);

admin_route.post("/",adminController.verifyadminlogin);

admin_route.get("/home",auth.isLogin,adminController.LoadAdminhome);

admin_route.get("/logout",auth.isLogin,adminController.adminlogout);

admin_route.get("/dashboard",auth.isLogin,adminController.admindashboard);

admin_route.get("/edit-user",auth.isLogin,adminController.editUser);

admin_route.post("/edit-user",adminController.updateUser)


admin_route.get("*", function(req,resp){
    resp.redirect("/admin");
})

module.exports= admin_route;