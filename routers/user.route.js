import express from 'express';
import { 
  registerUser,
  getUserById,
  updateUser,
  changePassword
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();


// router.route("/").get(getUser);
// router
//   .route("/:id")
//   .get(getUserById)
//   .delete(deleteUser)
//   .put(updateUser);
router.route("/register").post(registerUser);
router.route("/me").get(verifyToken, getUserById);
router.route("/infomation").put(verifyToken, updateUser);
router.route("/password").post(verifyToken, changePassword);

export default router;