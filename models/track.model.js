import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const trackSchema = mongoose.Schema(
    {
      courseId: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
      isDeleted: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
);

trackSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
trackSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});

trackSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});
  
const Track = mongoose.model("Track", trackSchema);

export default Track;