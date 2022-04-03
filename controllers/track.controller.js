import asyncHandler from "express-async-handler";
import Step from "../models/step.model.js"
import Track from "../models/track.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

// POST
const createTrack = asyncHandler(async (req, res) => {
    const {courseId, title} = req.body;
    let track = await Track.create({ courseId, title });
    
    track = track.toObject();
    delete track.createdAt;
    delete track.updatedAt;

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
  delete track.createdAt;
  delete track.updatedAt;
  
  return res.status(httpStatusCodes.OK).json(track);
});

// GET
const getStepsByTrackId = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let steps = await Step.find({trackId: id});

    if (!steps) {
        return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
    }
    console.log(steps)
    let listSteps = [];
    for (const step of steps) {
      let newStep = step.toObject();
      delete newStep.content;
      delete newStep.createdAt;
      delete newStep.updatedAt;
      listSteps.push(newStep);
    }   
    
    console.log(listSteps)
    
    res.status(httpStatusCodes.OK).json(listSteps);
})

export { createTrack, deleteTrack, updateTrack, getStepsByTrackId }