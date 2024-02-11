import { commentModel } from "./comment.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.

export default class CommentRepository{
    async add(newComment){
        try {
            const newcomment = new commentModel(newComment);
            return await newcomment.save();
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}