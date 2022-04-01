import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { 
  registerUser,
  getLoginUser,
  updateUser,
  changePassword,
  getAllUsers,
  roles,
  getUserById,
  userRoles,
  setRoles,
  adminUpdateInfo,
  adminUpdatePass
} from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/me").get(verifyToken, getLoginUser);
router.route("/infomation").put(verifyToken, updateUser);
router.route("/password").post(verifyToken, changePassword);


router.route("/").get(getAllUsers);
router.route("/roles").get(roles);
router.route("/:id").get(getUserById);
router.route("/:id").put(adminUpdateInfo);
router.route("/:id/roles").get(userRoles);
router.route("/:id/roles").post(setRoles);
router.route("/:id/password").post(adminUpdatePass);

export default router;