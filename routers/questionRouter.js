import express from 'express';
import { createQuestion, deleteQuestion, getQuestion, getQuestionById, updateQuestion } from '../controllers/questionControllers.js';

const router = express.Router();


router.route("/").get(getQuestion);
router
  .route("/:id")
  .get(getQuestionById)
  .delete(deleteQuestion)
  .put(updateQuestion);
router.route("/create").post(createQuestion);

export default router;