const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
   const token = req.headers['x-auth-token'];
   if(!token){
    return res.status(401).send('No token provided');
   }

   try {
    const decode=jwt.verify(token,process.env.SECRET_KEY);
    req.user=decode;
    next();
   } catch (error) {
     res.status(400).send('Invalid token');
   }

   

}

module.exports=auth;