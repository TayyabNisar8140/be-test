import * as mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});

export interface UserDocument extends Document{
    id: string;
    email: string;
    password:string;
}