import express from 'express';
import { createBlogComment, deleteBlogComment, updateBlogComment } from '../controllers/blogComment.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteBlogComment)
  .put(updateBlogComment);
router.route("/").post(verifyToken, createBlogComment);

export default router;