import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";
import jwt from "jsonwebtoken";


export default class UserController {
    constructor(){
        this.userRepository = new UserRepository();
      }

  // Registering a new User
  registerUser = async (req, res,next) => {
    const {name, email, password, gender } = req.body;
    console.log(name, email, password, gender );
    const hashPassword = await bcrypt.hash(password, 12);
    try {
      const newUser = {
        name,
        email,
        password:hashPassword,
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
    try{
      //1.find user by email
      //check user is there by checking the email
      const user = await this.userRepository.findByEmail(req.body.email);
      if(!user){
        return res
        .status(400)
        .send('Incorrect email');
      }else{
        //2.compare password with hashed password
       const result = await bcrypt.compare(req.body.password, user.password);
      //  console.log(req.body.password);
      //  console.log(user.password);

      if(result){
        // 3. Create token.
      const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET, //from .env file
        {
          expiresIn: '1h',
        }
      );

      // 4. Send token.
      return res.status(200).send(token);
    }else {
  return res
  .status(400)
  .send('Incorrect password ');
    }   
  }} catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  logout = async (req, res) => {
    const { token } = req.body;
  
    try {
      // // Add the token to the blacklist
      const blacklistedToken = await this.userRepository.logout( token );
  
      res.status(200).json("Logout successful");
    } catch (error) {
      console.log(error);
       throw new ApplicationError("Something went wrong ", 500);
    }
  };

  
}
