import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const answerSchema = mongoose.Schema(
    {
      questionId: {
        type: ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      }
    },
    {
      timestamps: true,
    }
);


const Answer = mongoose.model("Answer", answerSchema);

export default Answer;