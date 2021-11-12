import { Document } from "mongoose";


export interface CHAT extends Document {
    _id:string;
    text:string;
    groupInfo: string
   
}