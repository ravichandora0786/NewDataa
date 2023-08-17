const isLogin = async(req,resp,next)=>{
    try{
        if(req.session.user_id){}
        else{
            resp.redirect("/login");
        }
        next();
    } catch (error){
        console.log(error.message);
    }
}

const isLogout = async(req,resp,next)=>{
    try{
        if(req.session.user_id){
            resp.redirect("/home");
        }
       next();
    } catch (error){
        console.log(error.message);
    }
}

module.exports={
    isLogin,
    isLogout
}