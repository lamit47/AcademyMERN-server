import express from 'express';
import { createStep, deleteStep, updateStep, getStepById, postProgress } from '../controllers/step.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';


const router = express.Router();

    router
    .route("/:id")
    .delete(deleteStep)
    .put(updateStep)
    .get(getStepById);

    router.route("/").post(createStep);

    router.route("/:id/Progress").post(verifyToken, postProgress);

export default router;