import asyncHandler from "express-async-handler";
import Answer from "../models/answerModel.js";

const createAnswer = asyncHandler(async (req, res) => {
    const { questionId, content, user} = req.body;
    
    const answer = await Answer.create({
        questionId,
        content,
        user
    });
  
    if (answer) {
      res.status(201).json({
        _id: answer._id,
        questionId: answer.questionId,
        content: answer.content,
        user: answer.user
      });
    } else {
      res.status(400);
      throw new Error("Not found");
    }
    });

    //Delete BlogComment
const deleteAnswer = asyncHandler(async (req, res) => {
    const answer = await Answer.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (answer) {
      await answer.remove();
      res.json({ message: "Answer Removed" });
    } else {
      res.status(404);
      throw new Error("Answer not Found");
    }
  });
  
//Update Blog
const updateAnswer = asyncHandler(async (req, res) => {
    const { questionId, content, user } = req.body;
  
    const answer = await Answer.findById(req.params.id);
  
    // if (blog.user.toString() !== req.blog._id.toString()) {
    //   res.status(401);
    //   throw new Error("You can't perform this action");
    // }
  
    if (answer) {
        answer.questionId = questionId;
        answer.content = content;
        answer.user = user;

      const updated = await answer.save();
      res.json(updated);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });


export { createAnswer, deleteAnswer, updateAnswer }