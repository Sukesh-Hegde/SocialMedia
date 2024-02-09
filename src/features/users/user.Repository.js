import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import BlacklistTokenModel from "../logout/logout.schema.js";

// creating model from schema.
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{
    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();//save the document
            return newUser;
        }
        catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){ //if its a mongoose error then it will be thrown to the error handler midlewere which is there in (server.js file) 
                throw err;
            }else{
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
            
        }
    }


    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
      }

    async logout(token){
        try {
        const blacklistedToken = new BlacklistTokenModel({ token });
        return await blacklistedToken.save();
        } catch (error) {
            throw new ApplicationError("Something went wrong while loging out ", 500);
        }
    }

}