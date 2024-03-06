import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:'true'
    },
    RecieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:'true'
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true}); // this is used for retriving data like createdat , updated at => message.created at : time

const Message = mongoose.model("Messege",messageSchema);

export default Message;