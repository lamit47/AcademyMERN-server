import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { postCourse, getCourse, getCourseById, putCourseById, deleteCourseById, postRegisterCourse, getRegistedUsers, getWillLearns } from '../controllers/courseController.js';

const router = express.Router();

//router.route("/").post(postCourse);
router.route('/')
    .post(postCourse)
    .get(getCourse);

router.route('/:id')
    .get(getCourseById)
    .put(putCourseById)
    .delete(deleteCourseById);

router.post('/:id/Register', verifyToken, postRegisterCourse);

router.get('/:id/IsRegisted', verifyToken, getRegistedUsers);

router.get('/:id/WillLearns', getWillLearns);

export default router;