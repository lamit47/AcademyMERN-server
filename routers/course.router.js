import express from 'express';
import { 
    postCourse, 
    getCourses, 
    getCourseById, 
    putCourseById, 
    deleteCourseById, 
    postRegisterCourse,
    getRegisted,  
    getRegistedUsers, 
    getWillLearns, 
    getRequirements,
    getTrackByCourseId,
    getStepByCourseId,
    getExamsCourse,
    getCertifications,
    postCertify
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

router.route('/:id/IsRegisted').get( verifyToken, getRegisted);

router.route('/registedCourses/:userId').get( getRegistedUsers);

router.get('/:id/WillLearns', getWillLearns);
router.get('/:id/Requirements', getRequirements);

router.get('/:id/Tracks', getTrackByCourseId);
router.route('/:id/TrackSteps').get(verifyToken , getStepByCourseId);

router.route('/:id/Exams').get(getExamsCourse);

router.route('/certifications/:id').get(getCertifications);

router.route('/:id/Certify').post(verifyToken, postCertify);

export default router;