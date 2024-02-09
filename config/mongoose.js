import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL=process.env.DB_URL;
export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true   
        });
        console.log('Mongodb Connected using Mongoose');
    }catch(err){
        console.log("Error while connecting to db")
        console.log(err);
    }  
}

