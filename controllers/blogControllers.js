import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js"

//Get Blog
const getBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.find({ blog: req.blog._id });
    res.json(blog);
  });

//GetBlogbyID
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (note) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  
    res.json(blog);
  });

//Create Blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, PictureId } = req.body;
  
    if (!title || !content || !PictureId) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const blog = new Blog({ blog: req.blog._id, title, content, PictureId });
  
      const createdNote = await note.save();
  
      res.status(201).json(createdNote);
    }
  });

//Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (blog.user.toString() !== req.blog._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (blog) {
      await blog.remove();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  });
  
//Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
  
    const blog = await Blog.findById(req.params.id);
  
    if (blog.user.toString() !== req.blog._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (blog) {
      blog.title = title;
      blog.content = content;
      blog.category = category;
  
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });
export { createBlog, getBlog, getBlogById, deleteBlog, updateBlog}