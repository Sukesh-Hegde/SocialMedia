import PostRepository from "./posts.Repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async createPost(req, res) {
    const { caption } = req.body;
    const userID = req.userID; //requesting directly from token

    const newPost = {
      userId: userID,
      caption,
      imageUrl: req.file.filename,
    };
    try {
      const post = await this.postRepository.add(newPost);
      res.status(200).send(post);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while creating post");
    }
  }
  async getOnePost(req, res) {
    const id = req.params.id;
    try {
      const post = await this.postRepository.get(id);
      if (!post) {
        res.status(404).send("post is not found");
      } else {
        return res.status(200).send(post);
      }
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .send("Something went wrong while getting one posts");
    }
  }
  async getAllPost(req, res) {
    try {
      const posts = await this.postRepository.getAll();
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .send("Something went wrong while getting all posts");
    }
  }

  async deletePost(req, res) {
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {
      const post = await this.postRepository.get(id);
      // console.log(post.userId+" "+userID);
      if (post.userId == userID) {
        await this.postRepository.delete(post);
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while deleting post");
    }
  }

  async getUserPost(req, res) {
    const userID = req.userID; // requesting directly from token
    try {
      const posts = await this.postRepository.getByUserID(userID); // assuming you have a method to get posts by user ID
      console.log(posts);
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("Something went wrong while getting user posts");
    }
  }

  async updatePost(res,req){
    const id = req.params.id;
    const userID = req.userID; //requesting directly from token
    try {
      const post = await this.postRepository.get(id);
      if (post.userId == userID) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Post Updated");
      } else {
        res.status(403).json("Action forbidden");
      }
    }  catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong while deleting post");
    }
  }
}
