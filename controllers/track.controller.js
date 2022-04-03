import asyncHandler from "express-async-handler";
import Step from "../models/step.model.js"
import Track from "../models/track.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

// POST
const createTrack = asyncHandler(async (req, res) => {
    const {courseId, title} = req.body;
    let track = await Track.create({ courseId, title });
    
    track = track.toObject();
    return res.status(httpStatusCodes.OK).json(track);
});

// DELETE
const deleteTrack = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let track = await Track.findById(id);

  if (!track) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }

  await track.remove();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

// PUT
const updateTrack = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let { courseId, title } = req.body;

  let track = await Track.findById(id);

  if (!track) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }
  
  track.courseId = courseId;
  track.title = title;
  
  track = await track.save();

  track = track.toObject();
  
  return res.status(httpStatusCodes.OK).json(track);
});

// GET
const getTrackByStepId = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let step = await Step.find({trackId: id});

    if (!step) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
    }
    
    res.status(httpStatusCodes.OK).json(step);
})

export { createTrack, deleteTrack, updateTrack, getTrackByStepId }