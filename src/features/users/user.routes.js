import express from "express";
import UserController from "./user.controller.js";
import { verifyToken } from "../logout/tokenValidationMiddleware.js";

const userRouter = express.Router();
const userController = new UserController();

// All the paths to controller methods.
userRouter.get("/get-details/:id", verifyToken,(req, res) => {
  userController.getUser(req, res);
});

userRouter.put("/update-details/:id", verifyToken,(req, res) => {
  userController.updateDetails(req, res);
});

userRouter.get("/get-all-details",verifyToken,(req, res) => {
  userController.getAllUser(req, res);
});

userRouter.post("/signup", (req, res) => {
  userController.registerUser(req, res);
});

userRouter.post('/signin', (req, res)=>{
  userController.signIn(req, res)
});

userRouter.get("/logout", verifyToken, (req, res) => {
  userController.logout(req, res);
});

userRouter.get("/logout-all-devices",verifyToken,(req,res,next)=>{
  userController.logoutAllDevices(req,res,next);
});

export default userRouter;
