import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SCRETE,{
        expiresIn: '15d'
    });
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true, // prevents some cross-site scripting attacks XSS attacks
        sameSite:"strict", // prevents some CSRF or cross site request forgery attacks
        secure: false // used to work under https but we are not using so false
    });
}

export default generateTokenAndSetCookie;