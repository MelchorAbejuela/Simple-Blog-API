const express = require("express");
const router = express.Router();

const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/controller");

router.get("/api/posts", getAllPost);
router.post("/api/posts", createPost);
router.patch("/api/posts/:postId", updatePost);
router.delete("/api/posts/:postId", deletePost);

module.exports = router;
