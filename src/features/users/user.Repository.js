import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import BlacklistTokenModel from "../logout/logout.schema.js";
import { UserModel } from "./user.schema.js";
import loginTokenModel from "./login.schema.js";

// creating model from schema.
// const UserModel = mongoose.model('User', userSchema)

export default class UserRepository {
  async signUp(user) {
    try {
      // create instance of model.
      const newUser = new UserModel(user);
      await newUser.save(); //save the document
      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        //if its a mongoose error then it will be thrown to the error handler midlewere which is there in (server.js file)
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async logout(token, userId) {
    try {
      const blacklistedToken = new BlacklistTokenModel({ token, userId });
      return await blacklistedToken.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong while loging out ", 500);
    }
  }

  async loginRecord(token, userId){
    try {
      const LoginTokenModel = new loginTokenModel({ token, userId });
      return await LoginTokenModel.save();
    } catch (error) {
      throw new ApplicationError("Something went wrong while loging out ", 500);
    }
  }

  // async logoutAllDevices(userID) {
  //   try {
  //     // const userTokens = await BlacklistTokenModel.find({ userId: userID });
  //     const loginTokens = await loginTokenModel.find({ userId: userID });
  //     console.log(loginTokens);
  //     // const Blacklist = new BlacklistTokenModel(loginTokens);
  //     // await Blacklist.save();

  //     // return await  BlacklistTokenModel.push({ loginTokens});
  //     // console.log(userTokens);
 
  //     for (const token of loginTokens) {
  //       return await blacklistedToken.save();
  //     }

  //     // for (const token of userTokens) {
  //     //   return await token.remove();
  //     // }
      
  //   } catch (error) {
  //     throw new ApplicationError(
  //       "Something went wrong while loging out from all Devices ",
  //       500
  //     );
  //   }
  // }
  async getusr(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong while getting one user",
        500
      );
    }
  }

  async getAll() {
    try {
      const allUser = await UserModel.find();
      return allUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong while getting one user",
        500
      );
    }
  }

  async Update(id, userID, name, email, gender) {
    console.log(id, userID);
    if (id === userID) {
      try {
        const updated = await UserModel.findByIdAndUpdate(
          id,
          {
            name,
            email,
            gender,
          },
          { new: true }
        );
        return updated;
      } catch (err) {
        console.log(err);
        throw new ApplicationError(
          "Something went wrong while getting one user",
          500
        );
      }
    } else {
      res
        .status(403)
        .send("Access Denied! You can only update your own profile");
      return err;
    }
  }
}
