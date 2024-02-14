
import express from "express";
import { connectUsingMongoose } from "./config/mongoose.js";
import userRouter from "./src/features/users/user.routes.js";
import { verifyToken } from "./src/features/logout/tokenValidationMiddleware.js";
import postRouter from "./src/features/posts/posts.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import likeRouter from "./src/features/likes/likes.routes.js";
import friendRouter from "./src/features/friends/friends.routes.js";
import otpRouter from "./src/features/OTP/otp.routes.js";
import session from "express-session";
import loggerMiddleware from "./src/middleware.js/loggerMiddleware.js";


const server=express();
server.use(express.json());
server.use(loggerMiddleware);


server.use(
    session({
      secret: 'SecretKey',
      resave: false,
      saveUninitialized: true,
    })
  );



server.use("/api/users",userRouter);
server.use("/api/posts",verifyToken,postRouter);
server.use("/api/comments",verifyToken,commentRouter);
server.use("/api/likes",verifyToken,likeRouter);
server.use("/api/friends",verifyToken,friendRouter);
server.use('/api/otp',otpRouter);




server.listen(8000,()=>{
    console.log("Server is listening at 8000");
    connectUsingMongoose();
});