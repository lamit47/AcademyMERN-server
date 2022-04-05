import express from 'express';
import { 
  createExam, 
  getByExamId, 
  updateExam, 
  deleteExam, 
  createQuestion, 
  updateQuestion,
  deleteQuestion,
  getListQuestions,
  getQuestion,
  getExamQuestions,
  getResult,
  getFinished
} from '../controllers/exam.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/").post(createExam);
router.route("/:examId")
  .get(getByExamId)
  .put(updateExam)
  .delete(deleteExam);
router.route("/:examId/question")
  .post(createQuestion);
router.route("/:questionId/question")
  .put(updateQuestion)
  .delete(deleteQuestion);
router.route("/:examId/questions")
  .get(getListQuestions);

router.route("/:questionId/questionfull")
  .get(getQuestion);

router.route("/:examId/examquestions")
  .get(getExamQuestions);

router.route("/:id/Test")
  .get(verifyToken, getResult);

router.route("/:id/isfinished").get(getFinished);

export default router;