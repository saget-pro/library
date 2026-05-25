const Auth_middleware=async(req ,res ,next)=>{
    if(!req.session.user){
        return res.status(401).json({error:"un authorize please login"});
        
    
    }
    return next()
}
module.exports=Auth_middleware