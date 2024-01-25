import Post from "../model/post.model.js";

export const createPost = async (req, res, next) => {
  try {
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
