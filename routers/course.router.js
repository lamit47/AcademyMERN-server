import express from 'express';
import { 
    postCourse, 
    getCourses, 
    getCourseById, 
    putCourseById, 
    deleteCourseById, 
    postRegisterCourse, 
    getRegistedUsers, 
    getWillLearns, 
    getRequirements,
    getTrackByCourseId,
    getStepByCourseId
} from '../controllers/course.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.route("/").post(postCourse);
router.route('/')
    .post(postCourse)
    .get(getCourses);

router.route('/:id')
    .get(getCourseById)
    .put(putCourseById)
    .delete(deleteCourseById);

router.route('/:id/Register').post( verifyToken, postRegisterCourse);

router.route('/:id/IsRegisted').get( verifyToken, getRegistedUsers);

router.get('/:id/WillLearns', getWillLearns);
router.get('/:id/Requirements', getRequirements);

router.get('/:id/Tracks', getTrackByCourseId);
router.get('/:id/TrackSteps', getStepByCourseId);

export default router;