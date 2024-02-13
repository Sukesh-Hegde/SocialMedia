import mongoose from "mongoose";


export const commentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required:true,
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
});
export const commentModel = mongoose.model('Comment', commentSchema)
