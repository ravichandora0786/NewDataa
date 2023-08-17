const { model } = require('mongoose');
const User = require('../models/userModel');
const bcrypt =require("bcrypt");

const securePassword = async(password) => {
    try{
      const passwordHash = await bcrypt.hash(password,8);
      return passwordHash;
    }catch(error){
        console.log(error.message);
    }
}

const loadRegister = async(req,resp) => {
    try{
        resp.render("registration");
    }catch(error){
        console.log(error.message);
    }
}

const insertUser = async(req,resp)=>{
    try{
        
        const spassword = await securePassword(req.body.password);
        const user = new User({
            id:req.body.email,
            password:spassword,
            is_admin:0
        });
        
        // const doesUserExitsAlreay = await user.findOne({ email });

        // if (doesUserExitsAlreay) 
        // return resp.send("A user with that email already exits please try another one!");

        const userData = await user.save();

        if(userData){
            //resp.render('registration',{message:"registration Success"});
        resp.send("signup success");
        }
         else
        {
            resp.send("signup not success");
           // resp.render('registration',{message:"registration Failed"});
        }

    } catch(error){
        console.log(error.message);
    }
}

//login

const loginLoad = async(req,resp)=>{
    try{
    resp.render("login");
} catch(error){
    console.log(error.message);
}
}

const logined = async(req,resp)=>{
    try{
        const email = req.body.email;
    const password = req.body.password; 

    const userData = await User.findOne({id:email});
    if (userData) {
        const doesPasswordMatch = await bcrypt.compare(
            password,
            userData.password
          );
          if (doesPasswordMatch) {
            if(userData.is_admin===1){
                // resp.render('login',{message: "please verify your email"});
                 resp.send("you are not a user");
            }else{
                if(userData.is_varified===0){
                    // resp.render('login',{message: "please verify your email"});
                     resp.send("you are unactive");
                }else{
                    req.session.user_id = userData._id
                    resp.redirect("/home");
                }
            }

          }else
     resp.send("invalid useranme or password");

    }else
  resp.send("invalid username or password");

 
} catch(error){
    console.log(error.message);
}
}


const homeLoad = async(req,resp)=>{
    try{
    resp.render("home");
} catch (error){
    console.log(error.message);
}
}

const UserLogout = async(req,resp)=>{
    try{
    req.session.destroy();
    resp.redirect("/login");
} catch (error){
    console.log(error.message);
}
}


module.exports = {
     loadRegister,
     insertUser,
     loginLoad,
     logined,
     homeLoad ,
     UserLogout
    }