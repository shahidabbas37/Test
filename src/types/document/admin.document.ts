import { Document } from "mongoose";


export interface ADMIN extends Document {
    _id:string;
    name:string;
    email:string;
    password:string;
    username : string;
    role : boolean;
    
}