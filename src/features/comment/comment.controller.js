import CommentRepository from "./comment.Repository.js";
import { PostModel } from "../posts/posts.schema.js";
import { commentModel } from "./comment.schema.js";
export default class commentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComments(req, res) {
    const postId = req.params.id;
    const userID = req.userID; //requesting directly from token
    const { content } = req.body;
    try {
      const newComment = {
        userId: userID,
        content,
        postId,
      };
      const comment = await this.commentRepository.add(newComment);
      const post = await PostModel.findById(postId);
      post.Comments.push(comment._id);
      await post.save();
      res.status(200).json("Comment created!");
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while adding comment");
    }
  }
  async getComments(req, res) {
    const postId = req.params.id;
    try {
      const allComments = await this.commentRepository.get(postId);
      res.status(200).send(allComments);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while getting comment");
    }
  }

  async updateComment(req, res) {
    try {
      const id = req.params.id;
      const userID = req.userID; //requesting directly from token
    const coment = await this.commentRepository.getcomment(id);
    if (coment.userId == userID) {
      await coment.updateOne({ $set: req.body });
      res.status(200).json("comment Updated");
    } else {
      res.status(403).send("Action forbidden");
    }
    }  catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while updating comment");
    }
  }
  async deleteComment(req, res) {
    try {
      const id = req.params.id;
      const userID = req.userID; //requesting directly from token
    const coment = await this.commentRepository.getcomment(id);
    if (coment.userId == userID) {
      await this.commentRepository.delete(coment);
      res.status(200).json("comment deleted successfully");
    } else {
      res.status(403).send("Action forbidden");
    }
    }  catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while updating comment");
    }
  }

}

