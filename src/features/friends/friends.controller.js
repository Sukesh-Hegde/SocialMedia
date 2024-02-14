import FriendsRepository from "./friends.Repository.js";
import { UserModel } from "../users/user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import FriendModel from "./friends.schema.js";

export default class FriendController {
  constructor() {
    this.friendsRepository = new FriendsRepository();
  }

  async addfriend(req, res) {
    const userID = req.params.id;
    try {
      const user = await this.friendsRepository.getUserId(userID);
      // console.log(user);
      const newUser = {
        userId: user._id,
        friendId: user.friends,
      };
      const friends = await this.friendsRepository.addFriend(newUser);
      res.status(200).json(friends);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }

  async sendFriendRequest(req, res) {
    const friendId = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {
      const friendUser = await UserModel.findById(friendId);

      if (!friendUser) {
        return res.status(404).json("Friend user not found");
      }
      // Check if a friend request already exists
      if (
        !friendUser.pendingRequests.includes(userID) &&
        !friendUser.friends.includes(userID)
      ) {
        await friendUser.updateOne({ $push: { pendingRequests: userID } });
        res.status(200).json("Friend request sent!");
      } else {
        res.status(403).json("Friend request already sent or already friends");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }

  async getUserFriends(req, res) {
    const userID = req.params.id;
    try {
      const user = await this.friendsRepository.getUserId(userID);

      const friends = await this.friendsRepository.getFriends(user);
      res.status(200).json(friends);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }

  // Accept/Reject Friend Request
  respondToFriendRequest = async (req, res) => {
    const friendId = req.params.id;
    const currentUserId = req.userID; //requesting directly from token
    const { accept } = req.body;
    try {
      const currentUser = await UserModel.findById(currentUserId);

      // Remove from pendingRequests and add to friends
      if (accept) {
        await currentUser.updateOne({
          $pull: { pendingRequests: friendId },
          $push: { friends: friendId },
        });
        await FriendModel.findByIdAndUpdate(friendId, {
          $push: { friends: currentUserId },
        });
        res.status(200).json("Friend request accepted!");
      } else {
        await currentUser.updateOne({ $pull: { pendingRequests: friendId } });
        res.status(200).json("Friend request rejected!");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  };
}
