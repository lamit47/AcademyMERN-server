import express from 'express';
import { 
  login
} from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/token").post(login);

export default router;