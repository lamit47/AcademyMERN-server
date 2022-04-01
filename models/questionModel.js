import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
    {
      userId: {
        type: ObjectId,
        required: true,
      },
      categoryId: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
      },
      pictureId: {
        type: Number,
        required: true,
      },
      picturePath: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
);


const Question = mongoose.model("Question", questionSchema);

export default Question;