import express from 'express';
import { verifyToken, hasRole } from '../middlewares/auth.middleware.js';
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
  adminUpdatePass,
  publicUser
} from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/me").get(verifyToken, getLoginUser);
router.route("/infomation").put(verifyToken, updateUser);
router.route("/password").post(verifyToken, changePassword);


router.route("/").get(getAllUsers);
router.route("/roles").get(roles);
router.route("/public/:id").get(publicUser);
router.route("/:id").get((req, res, next) => hasRole(req, res, next, 'Administrators'), getUserById);
router.route("/:id").put(adminUpdateInfo);
router.route("/:id/roles").get(userRoles);
router.route("/:id/roles").post(setRoles);
router.route("/:id/password").post(adminUpdatePass);

export default router;