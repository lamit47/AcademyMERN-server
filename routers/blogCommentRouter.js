import express from 'express';
import { createBlogComment, deleteBlogComment, updateBlogComment } from '../controllers/blogCommentControllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteBlogComment)
  .put(updateBlogComment);
router.route("/create").post(createBlogComment);

export default router;