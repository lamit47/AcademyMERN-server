import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const willLearnSchema = mongoose.Schema(
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


const WillLearn = mongoose.model("WillLearn", willLearnSchema);

export default WillLearn;