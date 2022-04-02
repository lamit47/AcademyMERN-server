import express from 'express';
import { 
  createBlog, 
  deleteBlog, 
  getBlogs, 
  getBlogById, 
  updateBlog,
  getComments
} from '../controllers/blog.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();


router
  .route("/:id")
  .get(getBlogById)
  .delete(deleteBlog)
  .put(updateBlog);
  
router.route("/:id/comments").get(getComments);
router.route("/").get(getBlogs);
router.route("/").post(verifyToken, createBlog);

export default router;