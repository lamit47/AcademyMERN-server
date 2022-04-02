import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const blogCommentSchema = mongoose.Schema(
    {
      blogId: {
        type: ObjectId,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      }
    },
    {
      timestamps: true,
    }
);


const BlogComment = mongoose.model("BlogComment", blogCommentSchema);

export default BlogComment;