import { postSchema } from "./posts.schema.js";
import mongoose from "mongoose";

// creating model from schema.
const PostModel = mongoose.model("Post", postSchema);

// const LikeModel = mongoose.model('Like',likeSchema);

// const CommentModel = mongoose.model('Comment',commentSchema)

export default class PostRepository {
  async add(post) {
    try {
      const newProduct = new PostModel(post);
      return await newProduct.save();
        
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
