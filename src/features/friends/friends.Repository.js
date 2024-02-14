import FriendModel from "./friends.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../users/user.schema.js";

export default class FriendsRepository {
  async addFriend(user) {
    try {
      const newUser = new FriendModel(user);
      console.log(newUser);
      await newUser.save(); //save the document
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

    async getUserId(userId) {
        try {
          return await UserModel.findById(userId);
        } catch (err) {
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }

      async getFriends(user) {
        try {
          return await FriendModel.find({ _id: { $in: user.friends } });
        } catch (err) {
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }
}