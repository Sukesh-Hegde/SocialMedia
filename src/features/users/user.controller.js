import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../logout/tokenValidationMiddleware.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Registering a new User
  registerUser = async (req, res, next) => {
    const { name, email, password, gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const newUser = {
        name,
        email,
        password: hashPassword,
        gender,
      };

      await this.userRepository.signUp(newUser);
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
      //res.status(500).json({ message: error.message });
    }
  };

  async signIn(req, res, next) {
    try {
      //1.find user by email
      //check user is there by checking the email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect email");
      } else {
        //2.compare password with hashed password
        const result = await bcrypt.compare(req.body.password, user.password);

        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz", 
            {
              expiresIn: "1h",
            }
          );
          const userID = user._id; //requesting directly from token
          await this.userRepository.loginRecord(token, userID);

          res
            .cookie("token", token, {
              maxAge: 1 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .json({ success: true, msg: "user login successful", token });

          // 4. Send token.
        } else {
          return res.status(400).send("Incorrect password ");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  logout = async (req, res) => {
    const { token } = req.body;
    const userID = req.userID; //requesting directly from token
    try {
      // // Add the token to the blacklist
      const blacklistedToken = await this.userRepository.logout(token, userID);

      res.status(200).json("Logout successful");
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  };

  async logoutAllDevices(req, res) {
    const userID = req.userID;
    try {
      const logoutAll = await this.userRepository.logoutAllDevices(userID);
      if (logoutAll) {
        res.status(200).json("Logout from all devices successful");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong ", 500);
    }
  }

  async getUser(req, res) {
    const id = req.params.id;
    try {
      const user = await this.userRepository.getusr(id);
      if (user) {
        const { password, ...otherDetails } = user._doc;

        res.status(200).send(otherDetails);
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async getAllUser(req, res) {
    try {
      const user = await this.userRepository.getAll();
      res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async updateDetails(req, res) {
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    const { name, email, gender } = req.body;

    try {
      // const update =  {
      //   name,
      //   email,
      //   gender,
      // };
      const user = await this.userRepository.Update(
        id,
        userID,
        name,
        email,
        gender
      );
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .send("Something went wrong while updating details");
    }
  }
}
