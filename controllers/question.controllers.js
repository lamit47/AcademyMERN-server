import asyncHandler from "express-async-handler";
import Question from "../models/question.model.js";
import User from "../models/user.model.js";
import Answer from "../models/answer.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";


const getQuestions = asyncHandler(async (req, res) => {
  let { skip, take, categoryId } = req.query;
  let list;
  if (categoryId == 0) {
    list = await Question.find({ isDeleted: false }).limit(take).skip(skip).sort('-updatedAt');
  } else {
    list = await Question.find({ categoryId: categoryId, isDeleted: false }).limit(take).skip(skip).sort('-updatedAt');
  }
  return res.status(httpStatusCodes.OK).send(list);
});

const getQuestionById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let qs = await Question.findById(id);

  if (!qs) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Không tìm thấy câu hỏi này' });
  }

  return res.status(httpStatusCodes.OK).json(qs);
});


const createQuestion = asyncHandler(async (req, res) => {
  let userId = req.user.id;
  let { categoryId, title, content } = req.body;

  const qs = await Question.create({ userId, categoryId, title, content });
  
  return res.status(httpStatusCodes.OK).json(qs);
});

const deleteQuestion = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let qs = await Blog.findById(id);

  if (!qs) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu hỏi này' });
  }
  qs.isDeleted = true;
  qs = await qs.save()
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

const updateQuestion = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { categoryId, title, content } = req.body;

  let question = await Question.findById(id);

  if (!question) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu hỏi này' });
  }

  question.categoryId = categoryId;
  question.title = title;
  question.content = content;
  question = await question.save();
  
  return res.status(httpStatusCodes.OK).json(question);
});

const getComments = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { skip, take } = req.query;

  let comments = await Answer.find({ questionId: id }).limit(take).skip(skip).sort('-updatedAt');

  let listComments = [];
  for (let item of comments) {
    let comment = item.toObject();
    let user = await User.findById(comment.userId).select('-passwordHash');
    comment.user = user.toObject();
    listComments.push(comment);
  }
  
  return res.status(httpStatusCodes.OK).json(listComments);
});

export { createQuestion, getQuestions, getQuestionById, deleteQuestion, updateQuestion, getComments }