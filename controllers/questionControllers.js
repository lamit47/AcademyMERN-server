import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import Blog from "../models/questionModel.js"


const getQuestion = asyncHandler(async (req, res) => {
    const qs = await Question.find({ blog: req.qs});
    res.json(qs);
  });

//GetBlogbyID
const getQuestionById = asyncHandler(async (req, res) => {
    const qs = await Question.findById(req.params.id);
  
    if (qs) {
      res.json(qs);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  
    res.json(qs);
  });


const createQuestion = asyncHandler(async (req, res) => {
  const {userId, categoryId, title, content, isDeleted, pictureId, picturePath} = req.body;
  
  const qs = await Question.create({
    userId,
    categoryId,
    title,
    content,
    isDeleted,
    pictureId,
    picturePath
  });

  if (qs) {
    res.status(201).json({
      _id: qs._id,
      userId: qs.userId,
      categoryId: qs.categoryId,
      title: qs.title,
      content: qs.content,
      isDeleted: qs.isDeleted,
      pictureId: qs.pictureId,
      picturePath: qs.picturePath,
    });
  } else {
    res.status(400);
    throw new Error("Question not found");
  }
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
    const { userId, categoryId, title, content, isDeleted, pictureId} = req.body;
  
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
export { createQuestion, getQuestion, getQuestionById, deleteQuestion, updateQuestion}