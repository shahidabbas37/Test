//import { POST } from "../types/documents/post.document";
//import { postSchema } from "../models/post.model";
import { userSchema } from "../models/user.model";

//import { USER } from '../types/documents/user.document';
import { adminSchema } from "../models/admin.model";
import { ADMIN } from "../types/document/admin.document";
import { USER } from "../types/document/user.document";
import { createGroup } from "../types/Request/admin.requests";
import { groupSchema } from "../models/group.model";
import { GROUPMEMBERS } from "../types/document/groupMember";
import { groupMemberSchema } from "../models/groupMembers.model";
import { chatSchema } from "../models/chat.model";

export class MainAdmin {
  constructor() {}
  getAdmin(_id: string) {
    return adminSchema.findById(_id);
  }
  getAdminByEmail(email: string) {
    return adminSchema.findOne({ email: email });
  }
  saveAdmin(admin: ADMIN) {
    return new adminSchema(admin).save();
  }
  updateAdmin(admin: ADMIN) {
    return adminSchema.findByIdAndUpdate(admin._id, admin, { new: true });
  }
  deleteAdmin(_id: string) {
    return adminSchema.findByIdAndDelete(_id);
  }

  regUser(user: USER) {
    return new userSchema(user).save();
  }

  createGroup(group: createGroup) {
    return new groupSchema(group).save();
  }

  addUserToGroup(groupMember: GROUPMEMBERS) {
    return new groupMemberSchema(groupMember).save();
  }

  getAllChat() {
    return chatSchema.find({}).populate("groupInfo");
  }

  getSMSByText(text: string) {
    console.log(text);
    const post = chatSchema
      .find({ $text: { $search: text } })
      .populate("groupInfo");
    //console.log(post)
    return post;
  }

  countWordFrequency(text: string) {
    //  return chatSchema.aggregate( [
    //     { $count: text}
    //  ])
    return chatSchema.find({ $and: [{ text: text }] }); //.populate('postId')
  }
}
