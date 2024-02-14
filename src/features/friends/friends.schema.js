import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'], // customize the status values as needed
    default: 'pending'
  },
  
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }
  ],
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const FriendModel = mongoose.model('Friend', friendSchema);

export default FriendModel;
