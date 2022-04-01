import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examSchema = mongoose.Schema(
    {
      courseId: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      examDuration: {
        type: Number,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true,
    }
);


const Exam = mongoose.model("Exam", examSchema);

export default Exam;