
import express from "express";
import { connectUsingMongoose } from "./config/mongoose.js";
import userRouter from "./src/features/users/user.routes.js";
import { verifyToken } from "./src/features/logout/tokenValidationMiddleware.js";
import postRouter from "./src/features/posts/posts.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";

const server=express();
server.use(express.json());




server.use("/api/users",userRouter);
server.use("/api/posts",verifyToken,postRouter);
server.use("/api/comments",verifyToken,commentRouter);



server.listen(8000,()=>{
    console.log("Server is listening at 8000");
    connectUsingMongoose();
});