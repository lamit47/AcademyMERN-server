import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const blogCommentSchema = mongoose.Schema(
    {
      blogId: {
        type: ObjectId,
        required: true,
      },
      userId: {
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
blogCommentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
blogCommentSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

blogCommentSchema.set('toObject', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

export default BlogComment;