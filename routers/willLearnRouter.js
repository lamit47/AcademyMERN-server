import express from 'express';
import { createWillLearn, deleteWillLearn, updateWillLearn } from '../controllers/willLearnControllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteWillLearn)
  .put(updateWillLearn);
router.route("/create").post(createWillLearn);

export default router;