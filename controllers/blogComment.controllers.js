import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import BlogComment from "../models/blogComment.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

const createBlogComment = asyncHandler(async (req, res) => {
  let userId = req.user.id;
  let { blogId, content } = req.body;

  let blogComment = await BlogComment.create({ blogId, userId, content });
  let user = await User.findById(userId);
  blogComment = blogComment.toObject();
  blogComment.user = user.toObject();

  return res.status(httpStatusCodes.OK).json(blogComment);
});

//Delete BlogComment
const deleteBlogComment = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let blogComment = await BlogComment.findById(id);

  if (!blogComment) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu trả lời này' });
  }

  await blogComment.remove();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

//Update Blog
const updateBlogComment = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const { content } = req.body;

  let blogComment = await BlogComment.findById(id);

  if (!blogComment) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu trả lời này' });
  }
  
  blogComment.content = content;
  blogComment = await blogComment.save();
  let user = await User.findById(blogComment.userId);
  blogComment = blogComment.toObject();
  blogComment.user = user.toObject();
  return res.status(httpStatusCodes.OK).json(blogComment);
});


export { createBlogComment, deleteBlogComment, updateBlogComment }