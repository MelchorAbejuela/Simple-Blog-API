const postSchema = require("../schema/postSchema");

// done
const getAllPost = async (req, res, next) => {
  try {
    const post = await postSchema.find({});
    if (post < 1) {
      res.status(200).json({ msg: "No Post Found." });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    next(error);
  }
};

// done
const createPost = async (req, res, next) => {
  try {
    const post = await postSchema.create(req.body);
    if (post) {
      res.status(201).json(post);
    }
  } catch (error) {
    next(error);
  }
};

// done?
const updatePost = async (req, res, next) => {
  const _id = req.params.postId;
  const updatedPost = req.body;
  try {
    const post = await postSchema.findOneAndUpdate({ _id }, updatedPost, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      res.status(400).json({ msg: `Cannot find post with id ${_id}` });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    next(error);
  }
};

// done
const deletePost = async (req, res, next) => {
  const _id = req.params.postId;
  try {
    const post = await postSchema.findOneAndDelete({ _id });

    if (!post) {
      res.status(400).json({ msg: `Cannot find post with id ${_id}` });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPost, createPost, updatePost, deletePost };
