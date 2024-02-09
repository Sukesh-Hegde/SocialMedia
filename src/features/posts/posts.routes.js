import express from "express";
import PostController from "./posts.controller.js";
import { verifyToken } from "../logout/tokenValidationMiddleware.js";
import { uploadFile } from "../../middleware.js/fileupload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

// All the paths to controller methods.
postRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
  postController.createPost(req, res);
});


export default postRouter;
