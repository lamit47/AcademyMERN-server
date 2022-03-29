import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
    {
      UserId: {
        type: ObjectId,
        required: true,
      },
      CategoryId: {
        type: ObjectId,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
      Content: {
        type: String,
        required: true,
      },
      IsDeleted: {
        type: Boolean,
        required: true,
      },
      PictureId: {
        type: ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
);


const Blog = mongoose.model("Blog", blogSchema);

export default Blog;