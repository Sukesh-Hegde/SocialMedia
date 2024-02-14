import likeRepository from "./like.Repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class LikeController {
  constructor() {
    this.LikeRepository = new likeRepository();
  }
  //this section will like both post and comment, with respect the objectId passed in the quary
  //if its alrady liked by the same user then the like will be removed
  async likeAndDislike(req, res) {
    const Id = req.params.id;
    const userId = req.userID; //requesting directly from token
    try {
      const post = await this.LikeRepository.getPostId(Id);
      if (post) {
        if (!post.likes.includes(userId)) {
          await post.updateOne({ $push: { likes: userId } });
          await this.LikeRepository.likedPost(userId, Id);
          res.status(200).json("Post liked");
        } else {
          await post.updateOne({ $pull: { likes: userId } });
          res.status(200).json("Post Like removed");
        }
      } else {
        const comnt = await this.LikeRepository.getComntId(Id);
        if (comnt) {
          if (!comnt.likes.includes(userId)) {
            await comnt.updateOne({ $push: { likes: userId } });
            await this.LikeRepository.likedComment(userId, Id);
            res.status(200).json("Comment liked");
          } else {
            await comnt.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Comment Like removed");
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }

  async getlikes(req, res) {
    const Id = req.params.id;
    try {
      const post = await this.LikeRepository.getPostId(Id);
      if (post) {
        const type = "Post";
        const likes = await this.LikeRepository.getLikes(type, Id);
        return res.status(200).send(likes);
      } else {
        const type = "Comment";
        const likes = await this.LikeRepository.getLikes(type, Id);
        return res.status(200).send(likes);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
