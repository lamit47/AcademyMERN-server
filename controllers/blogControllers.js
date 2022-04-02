import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js"

//Get Blog
const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.find({ blog: req.blog});
    res.json(blog);
  });

//GetBlogbyID
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  
    res.json(blog);
  });

//Create Blog
const createBlog = asyncHandler(async (req, res) => {
  const {userId, categoryId, title, content, isDeleted, pictureId } = req.body;
  
  const blog = await Blog.create({
    userId,
    categoryId,
    title,
    content,
    isDeleted,
    pictureId,
  });

  if (blog) {
    res.status(201).json({
      _id: blog._id,
      userId: blog.userId,
      categoryId: blog.categoryId,
      title: blog.title,
      content: blog.content,
      isDeleted: blog.isDeleted,
      pictureId: blog.pictureId
    });
  } else {
    res.status(400);
    throw new Error("Blog not found");
  }
  });

//Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (blog) {
      await blog.remove();
      res.json({ message: "Blog Removed" });
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  });
  
//Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
  
    const blog = await Blog.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (blog) {
      blog.title = title;
      blog.content = content;
  
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });
export { createBlog, getBlog, getBlogById, deleteBlog, updateBlog}