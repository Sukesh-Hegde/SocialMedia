import express from "express";
import LikeController from "./likes.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:id", (req, res) => {
  likeController.getlikes(req, res);
});

likeRouter.post("/toggle/:id", (req, res) => {
  likeController.likeAndDislike(req, res);
});



export default likeRouter;
