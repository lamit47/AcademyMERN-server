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

// Duplicate the ID field.
willLearnSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
willLearnSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const WillLearn = mongoose.model("WillLearn", willLearnSchema);

export default WillLearn;