import asyncHandler from "express-async-handler";
import Blog from "../models/blog.model.js"
import User from "../models/user.model.js"
import Picture from "../models/picture.model.js"
import BlogComment from "../models/blogComment.model.js"
import httpStatusCodes from "../utils/httpStatusCodes.js";

//Get blogs
const getBlogs = asyncHandler(async (req, res) => {
  const hostname = process.env.HOSTNAME;
  let { skip, take, categoryId } = req.query;
  let list;
  if (categoryId == 0 || !categoryId) {
    list = await Blog.find({ isDeleted: false }).limit(take).skip(skip).sort('-updatedAt');
  } else {
    list = await Blog.find({ categoryId: categoryId, isDeleted: false }).limit(take).skip(skip).sort('-updatedAt');
  }

  let blogs = [];
  for (let item of list) {
    let blog = item.toObject();
    let picture = await Picture.findById(blog.pictureId);
    if (picture) {
      blog.picturePath = hostname + picture.picturePath;
    } else {
      blog.picturePath = '/';
    }
    blogs.push(blog);
  }
  return res.status(httpStatusCodes.OK).send(blogs);
});

//GetBlogbyID
const getBlogById = asyncHandler(async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  console.log("1233")
  if (!blog) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy blog này' });
  }
  return res.status(httpStatusCodes.OK).json(blog);
});

//Create Blog
const createBlog = asyncHandler(async (req, res) => {
  let userId = req.user.id;
  let { categoryId, title, content, pictureId } = req.body;

  let blog = await Blog.create({ userId, categoryId, title, content, pictureId });

  return res.status(httpStatusCodes.OK).json(blog);
});

//Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let blog = await Blog.findById(id);

  if (!blog) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy blog này' });
  }
  blog.isDeleted = true;
  blog = await blog.save()
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

//Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { categoryId, title, content, pictureId } = req.body;

  let blog = await Blog.findById(id);

  if (!blog) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy blog này' });
  }

  blog.categoryId = categoryId;
  blog.title = title;
  blog.content = content;
  blog.pictureId = pictureId;
  blog = await blog.save();
  
  return res.status(httpStatusCodes.OK).json(blog);
});

const getComments = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { skip, take } = req.query;

  let comments = await BlogComment.find({ blogId: id }).limit(take).skip(skip).sort('-updatedAt');

  let listComments = [];
  for (let item of comments) {
    let comment = item.toObject();
    let user = await User.findById(comment.userId).select('-passwordHash');
    comment.user = user.toObject();
    listComments.push(comment);
  }
  
  return res.status(httpStatusCodes.OK).json(listComments);
});

export { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog, getComments }