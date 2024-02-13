import { commentModel } from "./comment.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { PostModel } from "../posts/posts.schema.js";

// creating model from schema.

export default class CommentRepository {
  async add(newComment) {
    try {
      const newcomment = new commentModel(newComment);
      return await newcomment.save();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async get(postId) {
    try {
      const detail = await PostModel.findById(postId);
      const commentId = detail.Comments;
      const cmnt = await commentModel.find({ _id: commentId });
      return cmnt;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  async getcomment(id) {
    try {
      return await commentModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async update(id, userID, content) {
    console.log(id, userID);
    if (id.userId === userID) {
      try {
        const updated = await commentModel.findByIdAndUpdate(
          id,
          {
            content,
          },
          { new: true }
        );
        return updated;
      } catch (err) {
        console.log(err);
        throw new ApplicationError(
          "Something went wrong while getting one user",
          500
        );
      }
    } else {
      res
        .status(403)
        .send("Access Denied! You can only update your own profile");
      return err;
    }
  }

  async delete(comment) {
    try {
      return await comment.deleteOne();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
