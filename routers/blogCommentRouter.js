import express from 'express';
import { createBlogComment } from '../controllers/blogCommentControllers.js';

const router = express.Router();


// router.route("/").get(getBlog);
// router
//   .route("/:id")
//   .get(getBlogById)
//   .delete(deleteBlog)
//   .put(updateBlog);
router.route("/create").post(createBlogComment);

export default router;