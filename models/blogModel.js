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
      },
      pictureId: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
);


const Blog = mongoose.model("Blog", blogSchema);

export default Blog;