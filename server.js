
import express from "express";
import { connectUsingMongoose } from "./config/mongoose.js";


const server=express();

server.listen(3000,()=>{
    console.log("Server is listening at 3000");
    connectUsingMongoose();
});