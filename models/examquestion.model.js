import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examQuestionSchema = mongoose.Schema(
  {
    question: {
      examId: {
        type: ObjectId,
        required: true
      },
      content: {
        type: String,
        required: true
      },
    },
    options: [{
      content: {
        type: String,
        required: true
      }
    }],
    rightOption: {
      index: {
        type: Number,
        required: true
      }
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Duplicate the ID field.
examQuestionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
examQuestionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.createdAt
    delete ret.updatedAt
  }
});

examQuestionSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
});


const ExamQuestion = mongoose.model("ExamQuestion", examQuestionSchema);

export default ExamQuestion;