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
  getExamQuestions
} from '../controllers/exam.controller.js';
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

export default router;