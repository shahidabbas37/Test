import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { ADMIN } from "../types/document/admin.document";
import mongoose from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 5, required: true },
    role: { type: Boolean, required: true },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
});

//  post middleware  delete user password after sign up
AdminSchema.post("save", function (doc) {
  doc.password = undefined;
  //  console.log(doc);
});
AdminSchema.methods.comparePassword = function (password): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

AdminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};

export const adminSchema = model<ADMIN>("admins", AdminSchema);
