import express from 'express';
import { createCategory, deleteCategory, getCategory } from '../controllers/categoryControllers.js';

const router = express.Router();


router.route("/").get(getCategory);
router
  .route("/:id")
//   .get(getBlogById)
  .delete(deleteCategory);
//   .put(protect, updateBlog);
router.route("/create").post(createCategory);

export default router;