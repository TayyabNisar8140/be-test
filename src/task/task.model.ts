import * as mongoose from "mongoose";


export const taskSchema = new mongoose.Schema({
    name:{type:String,required:true},
});

export interface taskDocument extends Document{
    id: string;
    name: string;
}