import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = await extractToken(req);
  try {
    let decrypt = jwt.verify(token, process.env.JWT_AC_SECRET);
    req.user = decrypt.data;
    next();
  } catch (e) {
    return res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
  }
});

async function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const hasRole = asyncHandler(async (req, res, next, role) => {
  let token = await extractToken(req);
  try {
    let decrypt = jwt.verify(token, process.env.JWT_AC_SECRET);
    let scope = decrypt.data.scope;
    if (scope.includes(role)) {
      return next();
    }
    return res.status(401).json({ status: 'error', message: 'Not authorized' });
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Not authorized, token failed' });
  }
});

export { verifyToken, hasRole };