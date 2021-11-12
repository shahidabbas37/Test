import mongoose, { Schema } from "mongoose";

const GroupMembersSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    groupId: { type: Schema.Types.ObjectId, ref: "groups" },
  },
  {
    timestamps: true,
  }
);

export const groupMemberSchema = mongoose.model(
  "groupMembers",
  GroupMembersSchema
);
