import { Document } from "mongoose";


export interface GROUPMEMBERS extends Document {
    _id:string;
    groupId:string;
    userId:string;
   
    
    
}