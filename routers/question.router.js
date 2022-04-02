import express from 'express';
import { 
  createQuestion, 
  deleteQuestion, 
  getQuestions, 
  getQuestionById, 
  updateQuestion, 
  getComments 
} from '../controllers/question.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();


router
  .route("/:id")
  .get(getQuestionById)
  .delete(deleteQuestion)
  .put(updateQuestion);
  
router.route("/").get(getQuestions);
router.route("/:id/comments").get(getComments);
router.route("/").post(verifyToken, createQuestion);

export default router;