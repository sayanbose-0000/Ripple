import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },

  sender: {
    type: String,
    required: true,
  },

  messageValue: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  }
});

const MessageModel = mongoose.model("ripple-chats", MessageSchema);

export default MessageModel;