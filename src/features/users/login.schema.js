import mongoose from "mongoose";

const loginTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
});

const loginTokenModel = mongoose.model(
  "loginList",
  loginTokenSchema
);

export default loginTokenModel;
