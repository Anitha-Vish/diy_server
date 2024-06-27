import jwt from "jsonwebtoken";
import User from  "../models/userModel.js"


const verifyUser = async function (req,res, next) {
  
// Bearer TOKEN
    const {authorization} = req.headers;
    //console.log(authorization)

    if(!authorization) {
        return res.status(401).json({ error: "Not Authorized"})
    }
// Only TOKEN
    const token = authorization.split(' ')[1];
    console.log(token)

    try{
        const payload = jwt.verify(token, process.env.SECRET); 
        console.log(payload)
    
        const user = await User.findById(payload.id)
        next()

    } catch(error) {
        return res.status(401).json({error: "Not Authorized"})
    }
   
   
}

export default verifyUser;