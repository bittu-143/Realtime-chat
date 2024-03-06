import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.mode.js";
export const sendMessage = async (req,res)=>{
    try{
        const {message} = req.body; // we are getting message input from user maybe jagan/abhi/sharath/vishnu
        const {id: reciverId} = req.params; // we are getting reciver id from params 
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId,reciverId]},
        })
        if(!convesation){ // if no conversation create one
            conversation = await Conversation.create({
                participants: [senderId,reciverId]
            });
        }
        const newMessage = new Message({ //create new message
            senderId,
            reciverId,
            message,
        });
        if(newMessage){ 
            conversation.messages.push(newMessage._id); // we have to push the message id into conversation 
        }
        res.status(201).json({newMessage});
    }catch(error){
        console.log("error in message controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
    console.log("message sent",req.params.id);
    // req.params.id is used to retrive current user id
}