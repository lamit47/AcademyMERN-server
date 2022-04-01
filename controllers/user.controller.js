import asyncHandler from "express-async-handler";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import User from "../models/user.model.js";

// //Get Category
// const getUser = asyncHandler(async (req, res) => {
//     const user = await User.find({user: req.user});
//     res.json(user);
// });

//Create User
const registerUser = asyncHandler(async (req, res) => {
  let { email, password, firstName, lastName } = req.body;

  let existsUser = await User.findOne({ email });

  let roles = ['Students'];

  if (existsUser) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này đã tồn tại' });
  }

  let newUser = await User.create({ email: email, passwordHash: password, firstName: firstName, lastName: lastName, picture: "/", scope: roles});
  newUser.passwordHash = undefined;
  return res.status(httpStatusCodes.OK).json(newUser);
});

//Get User by Id
const getUserById = asyncHandler(async (req, res) => {
  let user = req.user;
  let userInfo = await User.findById(user._id).select('-passwordHash');

  if (!userInfo) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này chưa đăng ký' });
  }
  return res.status(httpStatusCodes.OK).json(userInfo);
});

//Update
const updateUser = asyncHandler(async (req, res) => {
  let { email, firstName, lastName } = req.body;
  let user = req.user;

  let userP = await User.findById(user._id);
  if (!userP) {
    res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng đăng nhập' });
    throw new Error("User not found");
  }
  userP.email = email;
  userP.firstName = firstName;
  userP.lastName = lastName;
  userP = await userP.save();

  userP.passwordHash = undefined;

  return res.status(httpStatusCodes.OK).json(userP);
});

// //Delete user
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   // if (note.user.toString() !== req.user._id.toString()) {
//   //   res.status(401);
//   //   throw new Error("You can't perform this action");
//   // }

//   if (user) {
//     await user.remove();
//     res.json({ message: "Removed Success!!!" });
//   } else {
//     res.status(404);
//     throw new Error("User not Found");
//   }
// });


export { 
  registerUser,
  getUserById,
  updateUser
}