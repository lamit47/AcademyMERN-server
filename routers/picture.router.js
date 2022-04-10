import express from 'express';
import { uploadPicture, newPicture, userProfilePic, adminProfilePic } from '../controllers/picture.controller.js';
import { verifyToken, hasRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.post('/uploads', uploadPicture , newPicture);

router.post('/upload', uploadPicture , newPicture);
router.post('/profile', verifyToken, uploadPicture , userProfilePic);
router.post('/upload/:id', (req, res, next) => hasRole(req, res, next, 'Administrators'), uploadPicture , adminProfilePic);

export default router;
