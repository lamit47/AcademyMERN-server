import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const blogCommentSchema = mongoose.Schema(
    {
      BlogId: {
        type: Int32,
        required: true,
      },
      UserId: {
        type: Int32,
        required: true,
      },
      Content: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
);


const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

export default BlogComment;