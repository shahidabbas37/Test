import { Document } from "mongoose";


export interface USER extends Document {
    _id:string;
    email:string;
    password:string;
    username : string;
   
    
}