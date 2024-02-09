import express from "express";
import UserController from "./user.controller.js";
import { verifyToken } from "../logout/tokenValidationMiddleware.js";

const userRouter = express.Router();
const userController = new UserController();

// All the paths to controller methods.
userRouter.post("/signup", (req, res) => {
  userController.registerUser(req, res);
});

userRouter.post('/signin', (req, res)=>{
  userController.signIn(req, res)
});

userRouter.get("/logout", verifyToken, (req, res) => {
  userController.logout(req, res);
});

export default userRouter;
