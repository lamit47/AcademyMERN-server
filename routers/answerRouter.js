import express from 'express';
import { createAnswer, deleteAnswer, updateAnswer } from '../controllers/answerControllers.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteAnswer)
  .put(updateAnswer);
router.route("/create").post(createAnswer);

export default router;