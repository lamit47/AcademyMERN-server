import asyncHandler from "express-async-handler";
import WillLearn from "../models/willLearn.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

const createWillLearn = asyncHandler(async (req, res) => {
  const { courseId, content } = req.body;

  const willLearn = await WillLearn.create({ courseId, content });

  return res.status(httpStatusCodes.OK).json(willLearn);
});

const deleteWillLearn = asyncHandler(async (req, res) => {
  const willLearn = await WillLearn.findById(req.params.id);

  if (!willLearn) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy' });
  }
  await willLearn.remove();
  return res.json(httpStatusCodes.OK).json({ status: 'success' });
});

//Update Blog
const updateWillLearn = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const { content } = req.body;

  let willLearn = await WillLearn.findById(id);

  if (!willLearn) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy' });
  }
  willLearn.content = content;
  willLearn = await willLearn.save();
  return res.json(httpStatusCodes.OK).json(willLearn);
});


export { createWillLearn, deleteWillLearn, updateWillLearn }