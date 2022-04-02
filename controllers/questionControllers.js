import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import Blog from "../models/questionModel.js";
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

//GetBlogbyID
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

//Delete Blog
const deleteQuestion = asyncHandler(async (req, res) => {
  const qs = await Blog.findById(req.params.id);

  // if (blog.user.toString() !== req.blog._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (qs) {
    await qs.remove();
    res.json({ message: "Question Removed" });
  } else {
    res.status(404);
    throw new Error("Question not Found");
  }
});

//Update Blog
const updateQuestion = asyncHandler(async (req, res) => {
  const { userId, categoryId, title, content, isDeleted, pictureId } = req.body;

  const qs = await Question.findById(req.params.id);

  // if (blog.user.toString() !== req.blog._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (qs) {
    qs.userId = userId;
    qs.categoryId = categoryId;
    qs.title = title;
    qs.content = content;
    qs.isDeleted = isDeleted;
    qs.pictureId = pictureId;

    const updated = await qs.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});
export { createQuestion, getQuestions, getQuestionById, deleteQuestion, updateQuestion }