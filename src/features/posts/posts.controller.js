import PostRepository from "./posts.Repository.js";


export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
      }
  async createPost(req, res) {
    const { caption } = req.body;
    const userID = req.userID; //requesting directly from token

    const newPost = {
      userID,
      caption,
      filename: req.file.filename,
    };
    try {
        const post = await this.postRepository.add(newPost);
        res.status(200).send(post);


    } catch (err) {
        console.log(err);
        return res.status(200).send("Something went wrong while creating post");
      }
    }
  
}
