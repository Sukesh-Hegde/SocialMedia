
import { commentModel } from "../comment/comment.schema.js";
import { PostModel } from "../posts/posts.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import LikeModel from "./like.schema.js";

export default class likeRepository {
    async getPostId(id) {
        try {
          return await PostModel.findById(id);
        } catch (err) {
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }

      async getComntId(id) {
        try {
          return await commentModel.findById(id);
        } catch (err) {
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }

      async likedPost(userId, postId){
        try{
            const newLike = new LikeModel({
                user: userId,
                likeable: postId,
                on_model:'Post'
            });
            await newLike.save();
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async likedComment(userId, postId){
      try{
          const newLike = new LikeModel({
              user: userId,
              likeable: postId,
              on_model:'Comment'
          });
          await newLike.save();
      }catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);    
      }
  }

  async getLikes(type, id){
    return await LikeModel.find({
        likeable: id,
        on_model:type
    }).populate('user')
    .populate({path:'likeable', model: type})
}
}