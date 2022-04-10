import express from 'express';
import { uploadPicture, newPicture, userProfilePic } from '../controllers/picture.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

//router.post('/uploads', uploadPicture , newPicture);

router.post('/upload', uploadPicture , newPicture);
router.post('/profile', verifyToken, uploadPicture , userProfilePic);

export default router;
