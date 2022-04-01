import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      isDeleted: {
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