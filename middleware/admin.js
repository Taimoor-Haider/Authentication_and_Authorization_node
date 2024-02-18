

const adminAuth=(req,res,next)=>{
    //401 Unauthorized
    //403 Forbidden
    if(!req.user.isAdmin){
       return res.status(403).send("You do not have permission!")
    }
    next();
}

module.exports=adminAuth;