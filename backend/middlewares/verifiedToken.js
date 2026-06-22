const jwt=require("jsonwebtoken")

//verify Token
function  verifyToken(req,res,next) {
    const authToken=req.headers.token;
    if(authToken){
const token=authToken.split(" ")[1];//بنستخدم split عشان نعمل array وخليناها 1 عشان منعرضش Bearer
try{
    const decodedPayload=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decodedPayload;
    next()

}catch(error){
            return res.status(401).json({message:"invalid token"})

}
    }else{
        return res.status(401).json({message:"no token provided"})
    }
    
}

//verify token &admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
        return res.status(401).json({message:"invalid token"})


        }
    })
}
//verify token &only user himself
function verifyTokenAndUserhimself(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id){
            next()
        }else{
        return res.status(401).json({message:"invalid token,only uer himself"})


        }
    })
}

//verify token &authorization
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next()
        }else{
        return res.status(401).json({message:"invalid token,only uer himself or admin"})


        }
    })
}

module.exports={
verifyToken,
verifyTokenAndAdmin,
verifyTokenAndUserhimself,
verifyTokenAndAuthorization,
}