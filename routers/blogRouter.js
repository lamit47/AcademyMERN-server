import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogById, updateBlog } from '../controllers/blogControllers.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route("/").get(protect, getBlog);
router
  .route("/:id")
  .get(getBlogById)
  .delete(protect, deleteBlog)
  .put(protect, updateBlog);
router.route("/create").post(protect, createBlog);

export default router;