import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const certificationSchema = mongoose.Schema(
    {
      courseId: {
        type: ObjectId,
        required: true,
      },
      userId: {
        type: ObjectId,
        required: true,
      },
      courseName: {
        type: String,
        required: true,
      },
      mark: {
        type: Number,
        required: true,
      }
    },
    {
      
    }
);

// Duplicate the ID field.
certificationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
certificationSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

certificationSchema.set('toObject', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Certification = mongoose.model("Certification", certificationSchema);

export default Certification;