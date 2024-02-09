
import express from "express";
import { connectUsingMongoose } from "./config/mongoose.js";
import userRouter from "./src/features/users/user.routes.js";

const server=express();
server.use(express.json());




server.use("/api/users",userRouter);


server.listen(8000,()=>{
    console.log("Server is listening at 8000");
    connectUsingMongoose();
});