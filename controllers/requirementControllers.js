import asyncHandler from "express-async-handler";
import Requirement from "../models/willLearnModel.js";

const createRequirement = asyncHandler(async (req, res) => {
    const { courseId, content } = req.body;
    
    const requirement = await Requirement.create({
        courseId,
        content,
    });
  
    if (requirement) {
      res.status(201).json({
        _id: requirement._id,
        courseId: requirement.courseId,
        content: requirement.content,
      });
    } else {
      res.status(400);
      throw new Error("Not found");
    }
    });

const deleteRequirement = asyncHandler(async (req, res) => {
    const requirement = await Requirement.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (requirement) {
      await requirement.remove();
      res.json({ message: "Blog Removed" });
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  });
  
//Update Blog
const updateRequirement = asyncHandler(async (req, res) => {
    const { courseId, content } = req.body;
  
    const requirement = await Requirement.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (requirement) {
        requirement.courseId = courseId;
        requirement.content = content;

      const updated = await requirement.save();
      res.json(updated);
    } else {
      res.status(404);
      throw new Error("Not found");
    }
  });


export { createRequirement, deleteRequirement, updateRequirement }