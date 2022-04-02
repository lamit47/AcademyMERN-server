import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
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
      },
      pictureId: {
        type: ObjectId,
        required: false,
      },
      picturePath: {
        type: String,
        required: true,
        default: '/'
      },
    },
    {
      timestamps: true,
    }
);


// Duplicate the ID field.
blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
blogSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;