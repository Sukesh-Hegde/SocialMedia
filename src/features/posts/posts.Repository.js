import { postSchema } from "./posts.schema.js";
import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";

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

  async get(id) {
    try {
      return await PostModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getAll() {
    try {
      return await PostModel.find();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async delete(post) {
    try {
      return await post.deleteOne();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getByUserID(userID) {
    try {
      const posts = await PostModel.find({ userId: userID });
      return posts;
    } catch (err) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  // async update(postId){
  //   try {
  //     return await PostModel.postId.updateOne({ $set: req.body });
  //   } catch (err) {
  //     throw new ApplicationError("Something went wrong with database", 500);
  //   }
  // }
}
