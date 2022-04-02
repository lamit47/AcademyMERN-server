import express from 'express';
import { createAnswer, deleteAnswer, updateAnswer } from '../controllers/answer.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router
  .route("/:id")
  .delete(deleteAnswer)
  .put(updateAnswer);
router.route("/").post(verifyToken, createAnswer);

export default router;