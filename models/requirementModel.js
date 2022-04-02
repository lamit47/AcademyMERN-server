import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const RequirementSchema = mongoose.Schema(
    {
      courseId: {
        type: ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
);


const Requirement = mongoose.model("Requirement", RequirementSchema);

export default Requirement;