import express from 'express';
import { createRequirement, deleteRequirement, updateRequirement } from '../controllers/requirementControllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteRequirement)
  .put(updateRequirement);
router.route("/create").post(createRequirement);

export default router;