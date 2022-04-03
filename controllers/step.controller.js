import asyncHandler from "express-async-handler";
import Step from "../models/step.model.js"
import Track from "../models/track.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

// POST
const createStep = asyncHandler(async (req, res) => {
    const {trackId, title, duration, content, embedLink} = req.body;
    let step = await Step.create({ trackId, title, duration, content, embedLink });
    step = step.toObject();
    return res.status(httpStatusCodes.OK).json(step);
});

// DELETE
const deleteStep = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let step = await Step.findById(id);

  if (!step) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }

  await step.remove();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

// PUT
const updateStep = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { trackId, title, duration, content, embedLink } = req.body;

  let step = await Step.findById(id);

  if (!step) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }
  
  step.trackId = trackId;
  step.title = title;
  step.duration = duration;
  step.content = content;
  step.embedLink = embedLink;
  
  step = await step.save();

  step = step.toObject();
  
  return res.status(httpStatusCodes.OK).json(step);
});

// GET
const getStepById = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let step = await Step.findById(id);

    if (!step) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
    }
    step = step.toObject();
    res.status(httpStatusCodes.OK).json(step);
})

export { createStep, deleteStep, updateStep, getStepById }