import mongoose from "mongoose";
var userSchema = new mongoose.Schema({ // in schema S is always Capital
    fullName:{type: String,required: true},
    userName:{type: String,required: true,unique: true},
    password:{type:String,required: true,minlength:6},
    gender:{type:String,required: true,enum:["male","female"]},
    profilepic:{type:String,default: "",}
}, {timestamps: true}); // used for member since = createdat returns time when created

const User = mongoose.model("User",userSchema); // here we are naming the schema as User model 
export default User;