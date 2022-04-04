import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const progressSchema = mongoose.Schema(
    {
      stepId: {
        type: ObjectId,
        required: true,
      },
      userId: {
        type: ObjectId,
        required: true,
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
);

progressSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
progressSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

progressSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});
  
const Progress = mongoose.model("Progress", progressSchema);

export default Progress;