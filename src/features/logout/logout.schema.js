import mongoose from "mongoose";

const BlacklistTokenSchema = mongoose.Schema({
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

const BlacklistTokenModel = mongoose.model(
  "BlacklistToken",
  BlacklistTokenSchema
);

export default BlacklistTokenModel;
