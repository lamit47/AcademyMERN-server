import asyncHandler from "express-async-handler";
import BlogComment from "../models/blogCommentModel.js";

const createBlogComment = asyncHandler(async (req, res) => {
    const { blogId, content, user} = req.body;
    
    const blogComment = await BlogComment.create({
        blogId,
        content,
        user
    });
  
    if (blogComment) {
      res.status(201).json({
        _id: blogComment._id,
        blogId: blogComment.blogId,
        content: blogComment.content,
        user: blogComment.user
      });
    } else {
      res.status(400);
      throw new Error("Not found");
    }
    });

    //Delete BlogComment
const deleteBlogComment = asyncHandler(async (req, res) => {
    const blogComment = await BlogComment.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (blogComment) {
      await blogComment.remove();
      res.json({ message: "Blog Removed" });
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  });
  
//Update Blog
const updateBlogComment = asyncHandler(async (req, res) => {
    const { blogId, content, user } = req.body;
  
    const blogComment = await BlogComment.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (blogComment) {
        blogComment.blogId = blogId;
        blogComment.content = content;
        blogComment.user = user;

      const updatedBlog = await blogComment.save();
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });


export { createBlogComment, deleteBlogComment, updateBlogComment }