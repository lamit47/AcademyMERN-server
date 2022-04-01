import express from 'express';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/category.controllers.js';

const router = express.Router();


router.route("/").get(getCategory);
router.route("/").post(createCategory);
router.route("/:id")
  .put(updateCategory)
  .delete(deleteCategory);

export default router;