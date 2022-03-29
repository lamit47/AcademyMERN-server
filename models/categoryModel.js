import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
    {
      Name: {
        type: String,
        required: true,
      },
      IsDeleted: {
        type: Boolean,
        required: false,
      }
    },
    {
      timestamps: true,
    }
);


const Category = mongoose.model("Category", categorySchema);

export default Category;