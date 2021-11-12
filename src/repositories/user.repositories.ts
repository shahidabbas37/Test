import { userSchema } from "../models/user.model";
import { USER } from "../types/document/user.document";
import { CHAT } from "./../types/document/chat.document";
import { chatSchema } from "../models/chat.model";

export class MainUser {
  constructor() {}
  getUserById(_id: string) {
    return userSchema.findById(_id);
  }
  getUserByEmail(email: string) {
    return userSchema.findOne({ email: email });
  }

  updateUser(user: USER) {
    return userSchema.findByIdAndUpdate(user._id, user, { new: true });
  }
  deleteUser(_id: string) {
    return userSchema.findByIdAndDelete(_id);
  }

  chatUser(chat: CHAT) {
    return new chatSchema(chat).save();
  }
}
