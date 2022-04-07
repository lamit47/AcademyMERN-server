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
  getTest,
  getFinished,
  postAnwser,
  getResult
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
  .get(verifyToken, getTest);

router.route("/:id/result")
  .get(getResult);

router.route("/:id/isfinished").get(getFinished);

router.route("/:id/answers")
  .post(verifyToken, postAnwser);

export default router;