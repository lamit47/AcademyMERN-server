import asyncHandler from "express-async-handler";
import WillLearn from "../models/willLearnModel.js";

const createWillLearn = asyncHandler(async (req, res) => {
    const { courseId, content } = req.body;
    
    const willLearn = await WillLearn.create({
        courseId,
        content,
    });
  
    if (willLearn) {
      res.status(201).json({
        _id: willLearn._id,
        courseId: willLearn.courseId,
        content: willLearn.content,
      });
    } else {
      res.status(400);
      throw new Error("Not found");
    }
    });

const deleteWillLearn = asyncHandler(async (req, res) => {
    const willLearn = await WillLearn.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (willLearn) {
      await willLearn.remove();
      res.json({ message: "Blog Removed" });
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  });
  
//Update Blog
const updateWillLearn = asyncHandler(async (req, res) => {
    const { courseId, content } = req.body;
  
    const willLearn = await WillLearn.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (willLearn) {
        willLearn.courseId = courseId;
        willLearn.content = content;

      const updated = await willLearn.save();
      res.json(updated);
    } else {
      res.status(404);
      throw new Error("Not found");
    }
  });


export { createWillLearn, deleteWillLearn, updateWillLearn }