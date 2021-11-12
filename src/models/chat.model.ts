import mongoose, { Schema } from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    text: String,
    groupInfo: { type: Schema.Types.ObjectId, ref: "groupMembers" },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({
  text: "text",
});

export const chatSchema = mongoose.model("chats", ChatSchema);
