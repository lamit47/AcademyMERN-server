import asyncHandler from "express-async-handler";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import User from "../models/user.model.js";

//Get all user
const getAllUsers = asyncHandler(async (req, res) => {
    let users = await User.find().select('-passwordHash');
    return res.status(httpStatusCodes.OK).json(users);
});

//Get list roles
const roles = asyncHandler(async (req, res) => {
  let roles = ['Administrators', 'Moderators', 'Lecturers', 'Students', 'Banned'];

  return res.status(httpStatusCodes.OK).json(roles);
});

//Get role of user
const userRoles = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let userRoles = await User.findById(id).select('scope');
  if (!userRoles) {
    return res.status(httpStatusCodes.NOT_FOUND).json('Không tìm thấy người dùng này');
  }

  return res.status(httpStatusCodes.OK).json(userRoles.scope);
});

//Set role for user
const setRoles = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let userRoles = await User.findById(id);
  if (!userRoles) {
    return res.status(httpStatusCodes.NOT_FOUND).json('Không tìm thấy người dùng này');
  }

  userRoles.scope = req.body;
  userRoles = await userRoles.save()
  return res.status(httpStatusCodes.OK).json(userRoles.scope);
});

//Get user by id
const getUserById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id).select('-passwordHash');
  if (!user) {
    return res.status(httpStatusCodes.NOT_FOUND).json('Không tìm thấy người dùng này');
  }

  return res.status(httpStatusCodes.OK).json(user);
});

const adminUpdateInfo = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    return res.status(httpStatusCodes.BAD_REQUEST).json('Vui lòng nhập đầy đủ thông tin');
  }

  let user = await User.findById(id);
  if (!user) {
    return res.status(httpStatusCodes.NOT_FOUND).json('Không tìm thấy người dùng này');
  }

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user = await user.save();
  user.passwordHash = undefined;
  return res.status(httpStatusCodes.OK).json(user);
});

const adminUpdatePass = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { password } = req.body;

  if (!password) {
    return res.status(httpStatusCodes.BAD_REQUEST).json('Vui lòng nhập mật khẩu');
  }

  let user = await User.findById(id);

  if (!user) {
    return res.status(httpStatusCodes.NOT_FOUND).json('Không tìm thấy người dùng này');
  }

  user.passwordHash = password;
  user = await user.save();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

//Create User
const registerUser = asyncHandler(async (req, res) => {
  let { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(httpStatusCodes.BAD_REQUEST).json('Vui lòng nhập đầy đủ thông tin');
  }

  let existsUser = await User.findOne({ email });

  let roles = ['Students'];

  if (existsUser) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này đã tồn tại' });
  }

  let newUser = await User.create({ email: email, passwordHash: password, firstName: firstName, lastName: lastName, picture: "/", scope: roles });
  newUser.passwordHash = undefined;
  return res.status(httpStatusCodes.OK).json(newUser);
});

//Get login user
const getLoginUser = asyncHandler(async (req, res) => {
  let user = req.user;

  let userInfo = await User.findById(user.id).select('-passwordHash');

  if (!userInfo) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Tài khoản này chưa đăng ký' });
  }
  return res.status(httpStatusCodes.OK).json(userInfo);
});

//Update
const updateUser = asyncHandler(async (req, res) => {
  let { email, firstName, lastName } = req.body;
  let user = req.user;
  if (!email || !firstName || !lastName) {
    return res.status(httpStatusCodes.BAD_REQUEST).json('Vui lòng nhập đầy đủ thông tin');
  }

  let userP = await User.findById(user.id);
  if (!userP) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Tài khoản này không tồn tại' });
  }
  userP.email = email;
  userP.firstName = firstName;
  userP.lastName = lastName;
  userP = await userP.save();

  userP.passwordHash = undefined;

  return res.status(httpStatusCodes.OK).json(userP);
});

//Update
const changePassword = asyncHandler(async (req, res) => {
  let { oldPassword, newPassword } = req.body;
  let user = req.user;
  if (!oldPassword || !newPassword) {
    return res.status(httpStatusCodes.BAD_REQUEST).json('Vui lòng nhập đầy đủ thông tin');
  }

  let userP = await User.findById(user.id);
  if (!userP) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Tài khoản này không tồn tại' });
  }
  if (!await userP.matchPassword(oldPassword)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Mật khẩu cũ không đúng' });
  }
  userP.passwordHash = newPassword;
  userP = await userP.save();

  userP.passwordHash = undefined;

  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});


export {
  registerUser,
  getLoginUser,
  updateUser,
  changePassword,
  getAllUsers,
  roles,
  userRoles,
  getUserById,
  setRoles,
  adminUpdateInfo,
  adminUpdatePass
}