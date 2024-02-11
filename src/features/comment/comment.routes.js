import express from "express";
import commentController from "./comment.controller.js";

const commentRouter = express.Router();
const CommentController = new commentController();


commentRouter.post("/:id", (req, res) => {
    CommentController.addComments(req, res);
});


export default commentRouter;
