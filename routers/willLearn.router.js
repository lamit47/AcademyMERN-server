import express from 'express';
import { createWillLearn, deleteWillLearn, updateWillLearn } from '../controllers/willLearn.controllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteWillLearn)
  .put(updateWillLearn);
router.route("/").post(createWillLearn);

export default router;