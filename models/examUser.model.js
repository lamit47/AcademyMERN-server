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
      CompletedAt: {
        type: Date,
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
          require: true
        },
        questionContent: {
          type: String,
          require: true
        },
        optionId: {
          type: ObjectId,
          require: true
        },
        optionContent: {
          type: String,
          require: true
        },
        isRight: {
          type: Boolean,
          require: true,
          default: true
        },
      }],
      title: {
        type: String,
        required: true,
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