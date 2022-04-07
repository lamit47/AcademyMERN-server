import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examDetailSchema = mongoose.Schema(
  {
    examUserId: {
        type: ObjectId,
        required: true,
    },
    questionId: {
        type: ObjectId,
        required: true,
    },
    optionId: {
        type: ObjectId,
        required: true,
    }
   
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Duplicate the ID field.
examDetailSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
examDetailSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.createdAt
    delete ret.updatedAt
  }
});

examDetailSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});


const ExamDetail = mongoose.model("ExamDetail", examDetailSchema);

export default ExamDetail;