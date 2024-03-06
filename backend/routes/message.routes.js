import express from "express";
import { sendMessage } from "../controllers/message.controller.js"; // .js imp 
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/send/:id",protectRoute,sendMessage); // when ever we have post request we will verify the user authorization and sends msg

export default router;