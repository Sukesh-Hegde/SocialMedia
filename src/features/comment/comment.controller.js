import CommentRepository from "./comment.Repository.js";


export default class commentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComments(req, res) {
    const postId = req.params.id;
    const userID =  req.userID; //requesting directly from token
    const { content } = req.body;
    console.log(postId+"--"+userID+"--"+content);
    try {
         const newComment = {
            userId:userID,
            content,
            postId
      };
      console.log(newComment);
      await this.commentRepository.add(newComment);
    //   const post = await PostModel.findById(postId);
    //   post.comments.push(newComment._id);
    //   await post.save();
      res.status(200).json("Comment created!");
    } catch (error) {
      console.log(error);
     throw new ApplicationError("Something went wrong ", 500);
    }
  }
}
