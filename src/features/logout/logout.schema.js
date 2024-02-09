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
})

const BlacklistTokenModel = mongoose.model("BlacklistToken", BlacklistTokenSchema);

export default BlacklistTokenModel;