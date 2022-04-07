import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const examUserSchema = mongoose.Schema(
    {
      examId: {
        type: ObjectId,
        required: true,
      },
      userId: {
        type: ObjectId,
        required: true,
      },
      noOfQuestion: {
        type: Number,
        required: true,
      },
      noOfRightOption: {
        type: Number,
        required: true,
      },
      mark: {
        type: Number,
        required: true,
      },
      details: [{
        questionId: {
          type: ObjectId,
          required: true
        },
        questionContent: {
          type: String,
          required: true
        },
        optionId: {
          type: ObjectId,
          required: true
        },
        optionContent: {
          type: String,
          required: true
        },
        isRight: {
          type: Boolean,
          required: true,
          default: false
        },
      }],
      title: {
        type: String
      }
    },
    {
      timestamps: true,
      versionKey: false
    }
);

// Duplicate the ID field.
examUserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
examUserSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

examUserSchema.set('toObject', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const ExamUser = mongoose.model("ExamUser", examUserSchema);

export default ExamUser;