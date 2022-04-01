import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import User from "../models/user.model.js";

const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let existsUser = await User.findOne({ email });

  if (!existsUser) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này chưa được đăng ký' });
  }

  if (!await existsUser.matchPassword(password)) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Mật khẩu không đúng' });
  }

  existsUser.passwordHash = undefined;
  let accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (15 * 60),
    data: existsUser
  }, process.env.JWT_AC_SECRET);
  let refreshToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3),
    data: existsUser
  }, process.env.JWT_RF_SECRET);
  return res.status(httpStatusCodes.OK).json({ accessToken: accessToken, refreshToken: refreshToken });
});

const refresh = asyncHandler(async (req, res) => {
  let { refreshToken } = req.body;
  let decrypt = jwt.verify(refreshToken, process.env.JWT_RF_SECRET);
  let id = decrypt.data.id;

  let existsUser = await User.findById(id);

  if (!existsUser) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Tài khoản này không tồn tại' });
  }

  let accessToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (15 * 60),
    data: existsUser
  }, process.env.JWT_AC_SECRET);
  return res.status(httpStatusCodes.OK).json({ accessToken: accessToken, refreshToken: refreshToken });
});

export {
  login,
  refresh
}