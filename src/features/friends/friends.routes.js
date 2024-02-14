import express from "express";
import FriendController from "./friends.controller.js";

const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get("/get-friends/:id", (req, res) => {
  friendController.getUserFriends(req, res);
});
friendRouter.post("/add-friend/:id", (req, res) => {
  friendController.addfriend(req, res);
});

//send friend request
friendRouter.post("/send/:id", (req, res) => {
  friendController.sendFriendRequest(req, res);
});
//giving response to the friend request
friendRouter.post("/respond-friendReq/:id", (req, res) => {
  friendController.respondToFriendRequest(req, res);
});

export default friendRouter;
