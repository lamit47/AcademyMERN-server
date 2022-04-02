import express from 'express';
import { createRequirement, deleteRequirement, updateRequirement } from '../controllers/requirement.controllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteRequirement)
  .put(updateRequirement);
router.route("/").post(createRequirement);

export default router;