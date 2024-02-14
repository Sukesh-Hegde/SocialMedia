import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  likeable:{
    type: mongoose.Schema.Types.ObjectId,
    refPath:'on_model'//this will be a separate attribute , which specify which type of objects can appear here, i.e post or comment
},
on_model:{
  type:String,
  enum:['Post','Comment']
},
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel;
