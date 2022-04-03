import express from 'express';
import { createTrack, deleteTrack, updateTrack, getStepsByTrackId } from '../controllers/track.controller.js';

const router = express.Router();

    router
    .route("/:id")
    .delete(deleteTrack)
    .put(updateTrack);

    router.route("/").post(createTrack);

    router.get("/:id/Steps", getStepsByTrackId);

export default router;