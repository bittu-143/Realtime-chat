import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const login = async (req,res)=>{
    // some code
    try{
        const {username,password} = req.body;
        const user = await User.findOne({ userName: username }); // find the userName = username in User model
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || ""); // checking if password is correct or not
        // above here if user is not present we are just adding "" empty string

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id : user._id,
            fullName: user.fullName,
            username: user.userName,
            profilePic: user.profilepic
        });
    }catch(error){
        console.log("Error in Login controller ",error.message);
        res.status(500).json({error: "internal Server error"});
    }
    console.log("login user");
};

export const signup = async (req,res)=>{
    // some code
    try{
        const {fullname,username,password,confirmpassword,gender} = req.body;
        if(password!==confirmpassword){
            return res.status(400).json({error:"passwords don't match"});
        }
        const user = await User.findOne({username});
        if(user){ 
            console.log("User name already exist");
            return res.status(400).json({error:"username already exist"});
        }
        // hashing password 
        const key = await bcrypt.genSalt(5); // the higher the num in gensalt the longer it takes or it slows down
        const hashedPassword = await bcrypt.hash(password,key); // yoo encryption iendhi
        // https://avatar-placeholder.iran.liara.run/ all avatars i got is from this api
        // https://avatar.iran.liara.run/public/boy for andom boy avatar
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        // https://avatar.iran.liara.run/public/girl for random girl avatar
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName: fullname, //if incase they both are same like fullName in model and fullName here also we can just use fullName,
            userName: username,
            password: hashedPassword,  // here we are using it same name in model and here so we can just leave like this
            gender,  // here also same as above
            profilepic: gender==="male" ?  boyProfilePic : girlProfilePic
        });
        if(newUser){
            // generate jwt token bro
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();  // we are saving this new user
            res.status(201).json({
                _id : newUser._id,
                fullName: newUser.fullName,
                profilePic: newUser.profilepic
            });
        }else{
            return res.status(400).json({error:"Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup controller ",error.message);
        res.status(500).json({error: "internal Server error"});
    }
    console.log("signup user");
};

export const logout = (req,res)=>{
    // some code
    try{
        res.cookie("jwt",{ maxAge:0});
        res.status(200).json({mesage: "Logged out successfully"});
    } catch(error){
        console.log("Error in logout controller ",error.message);
        res.status(500).json({error: "internal Server error"});
    }
    console.log("Logout user");
}

