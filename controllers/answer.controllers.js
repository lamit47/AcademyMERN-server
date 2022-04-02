import asyncHandler from "express-async-handler";
import Answer from "../models/answer.model.js";
import User from "../models/user.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

const createAnswer = asyncHandler(async (req, res) => {
  let userId = req.user.id;
  let { questionId, content } = req.body;

  let answer = await Answer.create({ questionId, userId, content });
  let user = await User.findById(userId);
  answer = answer.toObject();
  answer.user = user.toObject();

  return res.status(httpStatusCodes.OK).json(answer);
});

const deleteAnswer = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let answer = await Answer.findById(id);

  if (!answer) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu trả lời này' });
  }

  await answer.remove();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

const updateAnswer = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { content } = req.body;

  let answer = await Answer.findById(id);

  if (!answer) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu trả lời này' });
  }
  
  answer.content = content;
  answer = await answer.save();
  let user = await User.findById(answer.userId);
  answer = answer.toObject();
  answer.user = user.toObject();
  return res.status(httpStatusCodes.OK).json(answer);
});


export { createAnswer, deleteAnswer, updateAnswer }