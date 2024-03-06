import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        if(!token){  // check authorization using if token exist or not
            return res.status(401).json({error: "unauthorized- no token provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SCRETE); // tryig to verify the token using screte env variable

        if(!decoded){ // check if token is expired
            return res.status(401).json({error: "unauthorized- invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password"); // after token validation we fetch userid from user model
        // and remove its password and store
        if(!user){ // check if user is present or not
            return res.status(404).json({error:"User not found"});
        }
        req.user = user; //if user found

        next();
        
    }catch(error){
        console.log("error in protectRoute middleware",error.message);
        res.statys(500).json({error: "internal server error"});
    }
}

export default protectRoute;