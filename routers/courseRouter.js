import express from 'express';
import { postCourse } from '../controllers/courseController.js';

const router = express.Router();

router.route("/").post(postCourse);

export default router;