import express from "express";
import commentController from "./comment.controller.js";

const commentRouter = express.Router();
const CommentController = new commentController();


commentRouter.post("/:id", (req, res) => {
    CommentController.addComments(req, res);
});
commentRouter.get("/:id", (req, res) => {
    CommentController.getComments(req, res);
  });

  commentRouter.put("/:id", (req, res) => {
    CommentController.updateComment(req, res);
  });
  commentRouter.delete("/:id", (req, res) => {
    CommentController.deleteComment(req, res);
  });


export default commentRouter;
