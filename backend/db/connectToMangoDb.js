import mongoose from "mongoose";

const connectToMangoDB = async () => {
    try{
        await mongoose.connect(process.env.mango_db_url); //connecting to mango db using url i stored in .env variables
        console.log("connected to mango db");
    }catch(error){
        console.log("Error connecting to mango db",error.message);
    }
}
export default connectToMangoDB;