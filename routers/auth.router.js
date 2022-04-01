import express from 'express';
import { 
  login,
  refresh
} from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/token").post(login);
router.route("/refresh").post(refresh);

export default router;