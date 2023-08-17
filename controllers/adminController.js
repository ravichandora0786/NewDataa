const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loadlogin = (req,resp)=>
{
    try{
        resp.render("login");
    }catch(error){ 
        console.log(error.message);
    }
}

const verifyadminlogin = async (req,resp)=>{
    try{
        const Aemail = req.body.aemail;
        const Apassword= req.body.apassword;

    const userData = await User.findOne({id:Aemail});
    if(userData){

        const passwordMatch = await bcrypt.compare(Apassword,userData.password)
        if(passwordMatch){

            if(userData.is_admin===0){
                resp.render("login",{message:"Email and password is inciorrect."});
            }else{
                req.session.user_id = userData._id;
                resp.redirect("/admin/home");
            }

        }else{
            resp.render("login",{message:"Email and password is inciorrect."});
        }

    }  else{
        resp.render("login",{message:"Email and password is inciorrect."});

    }     

        
    }catch(error){ 
        console.log(error.message);
    }
}

const LoadAdminhome = async (req,resp)=>
{
    try{
        const data = await User.findById({_id:req.session.user_id});

        resp.render("home", {admin:data});
    }catch(error){ 
        console.log(error.message);
    }

}


const adminlogout= async (req,resp)=>
{
    try{
        req.session.destroy();
        resp.redirect("/admin");
    }catch(error){ 
        console.log(error.message);
    }

}

const admindashboard = async (req,resp)=>
{
    try{
        const finduser = await User.find({is_admin:0});
        resp.render("admindash",{users:finduser});
    }catch(error){ 
        console.log(error.message);
    }

}

const editUser = async (req,resp)=>
{
    try{
       const useid = req.query.id;
     const userdat= await User.findById({_id:useid});
     if(userdat){
       
        resp.render("edit-user",{user:userdat});
     }
     else{
        resp.redirect("/admin/dashboard");
     }
       
    }catch(error){ 
        console.log(error.message);
    }

}

const updateUser = async (req,resp)=>
{
    try{
       const updatedata = await User.findByIdAndUpdate({_id:req.body.hide},{$set:{ id:req.body.email,is_varified:req.body.status}})

       resp.redirect("/admin/dashboard");

    }catch(error){ 
        console.log(error.message);
    }

}


module.exports={
    loadlogin,
    verifyadminlogin,
    LoadAdminhome,
    adminlogout,
    admindashboard,
    editUser,
    updateUser
}