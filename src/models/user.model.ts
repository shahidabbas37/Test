import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { USER } from "../types/document/user.document";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username should not be empty"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email should not be empty"],
      unique: true,
      match: [
        /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password  should not be empty"],
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
});

//  post middleware  delete user password after sign up
UserSchema.post("save", function (doc) {
  doc.password = undefined;
  console.log(doc);
});
UserSchema.methods.comparePassword = function (password): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};


export const userSchema = mongoose.model<USER>("users", UserSchema);
