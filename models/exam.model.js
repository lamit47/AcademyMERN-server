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

// Duplicate the ID field.
examSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
examSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.createdAt
    delete ret.updatedAt
  }
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;