import asyncHandler from "express-async-handler";
import Requirement from "../models/requirement.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

const createRequirement = asyncHandler(async (req, res) => {
  const { courseId, content } = req.body;

  const requirement = await Requirement.create({ courseId, content });

  return res.status(httpStatusCodes.OK).json(requirement);
});

const deleteRequirement = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const requirement = await Requirement.findById(id);

  if (!requirement) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy' });
  }
  requirement.remove();
  return res.status(httpStatusCodes.OK).json(requirement);
});

//Update Blog
const updateRequirement = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  let requirement = await Requirement.findById(id);

  if (!requirement) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy' });
  }
  requirement.content = content;
  requirement = await requirement.save();
  return res.status(httpStatusCodes.OK).json(requirement);
});


export { createRequirement, deleteRequirement, updateRequirement }