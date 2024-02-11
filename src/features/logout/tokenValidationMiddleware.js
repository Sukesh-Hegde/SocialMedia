import BlacklistTokenModel from "./logout.schema.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]; 
  // const token = req.cookie;
  // console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });

    if (isBlacklisted) {
      return res.status(401).json("Unauthorized - Need to Login ");
    }
    const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
    req.userID = payload.userID;
    // console.log(payload);

    // Continue processing if the token is not blacklisted
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
