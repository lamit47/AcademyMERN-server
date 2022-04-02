import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = extractToken(req);
  try {
    let decrypt = jwt.verify(token, process.env.JWT_AC_SECRET);
    req.user = decrypt.data;
    next();
  } catch (e) {
    res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
    throw new Error("Not authorized, token failed");
  }
});

function extractToken (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

export { verifyToken };