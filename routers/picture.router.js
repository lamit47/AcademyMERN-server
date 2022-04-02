import express from 'express';
import { uploadPicture, newPicture } from '../controllers/picture.controller.js';

const router = express.Router();

//router.post('/uploads', uploadPicture , newPicture);

router.post('/', uploadPicture , newPicture);

export default router;
