import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Message is a required field"],
    },
    relatedRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    sendBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
