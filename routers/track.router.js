import express from 'express';
import { createTrack, deleteTrack, updateTrack, getTrackByStepId } from '../controllers/track.controller.js';

const router = express.Router();

    router
    .route("/:id")
    .delete(deleteTrack)
    .put(updateTrack);

    router.route("/").post(createTrack);

    router.get("/:id/Steps", getTrackByStepId);

export default router;