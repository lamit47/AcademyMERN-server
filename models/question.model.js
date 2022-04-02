import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
    {
      userId: {
        type: ObjectId,
        required: true,
      },
      categoryId: {
        type: ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
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
questionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
questionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;