import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
    {
      name: {
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
categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
categorySchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;