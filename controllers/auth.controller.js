import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import httpStatusCodes from "../utils/httpStatusCodes.js";
import User from "../models/user.model.js";

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let existsUser = await User.findOne({ email });

  if (!existsUser) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này chưa được đăng ký' });
  }

  if (!existsUser.matchPassword(password)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Mật khẩu không đúng' });
  }
  
  let accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: existsUser
  }, process.env.JWT_AC_SECRET);
  let refreshToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: existsUser
  }, process.env.JWT_RF_SECRET);
  return res.status(httpStatusCodes.OK).json({ accessToken: accessToken, refreshToken: refreshToken });
});

export { 
  login,
}