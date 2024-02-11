import express from "express";
import PostController from "./posts.controller.js";
import { verifyToken } from "../logout/tokenValidationMiddleware.js";
import { uploadFile } from "../../middleware.js/fileupload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

// All the paths to controller methods.
postRouter.put("/:id", (req, res) => {
  postController.updatePost(req, res);
});

postRouter.delete("/:id", (req, res) => {
  postController.deletePost(req, res);
});



postRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
  postController.createPost(req, res);
});

postRouter.get("/all", (req, res) => {
  postController.getAllPost(req, res);
});

postRouter.get("/", (req, res) => {
  postController.getUserPost(req, res);
});


postRouter.get("/:id", (req, res) => {
  postController.getOnePost(req, res);
});


export default postRouter;
