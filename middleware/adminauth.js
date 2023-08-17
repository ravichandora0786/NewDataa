const isLogin = async(req,resp,next)=>{
    try{
        if(req.session.user_id){}
        else{
            resp.redirect("/admin");
        }
        next();
    } catch (error){
        console.log(error.message);
    }
}

const isLogout = async(req,resp,next)=>{
    try{
        if(req.session.user_id){
            resp.redirect("/admin/home");
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