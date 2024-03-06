import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messeges:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
    }],
}, {timestamps: true}); // this is used for retriving data like createdat , updated at => message.created at : time

const Conversation = mongoose.model("Conversations",conversationSchema);

export default Conversation;