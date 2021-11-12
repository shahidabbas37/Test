import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
);

export const groupSchema = mongoose.model("groups", GroupSchema);
