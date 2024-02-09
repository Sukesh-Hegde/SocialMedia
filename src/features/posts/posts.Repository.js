import { postSchema } from "./posts.schema.js";
import mongoose from "mongoose";



// creating model from schema.
const PostModel = mongoose.model('Post', postSchema);

// const LikeModel = mongoose.model('Like',likeSchema);

// const CommentModel = mongoose.model('Comment',commentSchema)

export default class PostRepository{

    async add(post){
        
    }
}