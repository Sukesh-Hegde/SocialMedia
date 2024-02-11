import CommentRepository from "./comment.Repository.js";
import { PostModel } from "../posts/posts.schema.js";
export default class commentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComments(req, res) {
    const postId = req.params.id;
    const userID =  req.userID; //requesting directly from token
    const { content } = req.body;
    try {
         const newComment = {
            userId:userID,
            content,
            postId
      };
      const comment = await this.commentRepository.add(newComment);
      const post = await PostModel.findById(postId);
      post.Comments.push(comment._id);
      await post.save();
      res.status(200).json("Comment created!");
    } catch (error) {
      console.log(error);
     throw new ApplicationError("Something went wrong ", 500);
    }
  }
}
