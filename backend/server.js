import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connectToMangoDB from "./db/connectToMangoDb.js";
import messageRoutes from "./routes/message.routes.js";
import cookiePaerser from "cookie-parser"; // this is middleware used to retrive cookies 
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config(); // this ensures that we can use dotenv variables all over server

app.use(express.json()); // this parses the incomming requests with json payloads from req.body 
// sequence really matters f**k i wasted 30min here
app.use(cookiePaerser());
app.use("/api/auth",authRoutes); // here /api/auth will be added before the routers from routes folder js
app.use("/api/messages",messageRoutes); 

app.get("/",(req,res)=>{
    res.send("Hello world");
});


app.listen(PORT,()=>{
    connectToMangoDB();
    console.log(`running server on port ${PORT}`);
});