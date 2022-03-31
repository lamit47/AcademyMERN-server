import express from 'express';
import { postCourse, getCourse } from '../controllers/courseController.js';

const router = express.Router();

//router.route("/").post(postCourse);
router.post('/', postCourse);
router.get('/' , getCourse);

export default router;