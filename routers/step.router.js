import express from 'express';
import { createStep, deleteStep, updateStep, getStepById } from '../controllers/step.controller.js';

const router = express.Router();

    router
    .route("/:id")
    .delete(deleteStep)
    .put(updateStep)
    .get(getStepById);

    router.route("/").post(createStep);

export default router;