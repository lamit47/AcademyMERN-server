import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const requirementSchema = mongoose.Schema(
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
requirementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
requirementSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Requirement = mongoose.model("Requirement", requirementSchema);

export default Requirement;