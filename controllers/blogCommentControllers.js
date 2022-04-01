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


export { createBlogComment}