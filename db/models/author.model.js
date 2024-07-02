// schema
import { Schema, model } from 'mongoose'
const authorSchema = new Schema({
    name:{type:String,required:true},
    bio:{type:String},
    birthDate:{type:Date},
    books:[{type:Schema.Types.ObjectId,ref:'Book'}]
},{timestamps:true})

// model
export const Author = model('Author',authorSchema)