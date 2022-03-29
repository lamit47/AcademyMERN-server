import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogById, updateBlog } from '../controllers/blogControllers.js';

const router = express.Router();


router.route("/").get(getBlog);
router
  .route("/:id")
  .get(getBlogById)
  .delete( deleteBlog)
  .put(updateBlog);
router.route("/create").post(createBlog);

export default router;