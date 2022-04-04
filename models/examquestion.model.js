import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examQuestionSchema = mongoose.Schema(
  {
    question: {
      examId: {
        type: ObjectId,
        require: true
      },
      content: {
        type: String,
        require: true
      },
    },
    options: [{
      content: {
        type: String,
        require: true
      }
    }],
    rightOption: {
      index: {
        type: Number,
        require: true
      }
    },
    isDeleted: {
      type: Boolean,
      require: false,
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