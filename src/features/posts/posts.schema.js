import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    caption:{
        type:String
    },
    imageUrl:{
        type:String
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }],
    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})