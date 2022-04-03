import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const stepSchema = mongoose.Schema(
    {
      trackId: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      embedLink: {
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

stepSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
stepSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});

stepSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});
  
const Step = mongoose.model("Step", stepSchema);

export default Step;