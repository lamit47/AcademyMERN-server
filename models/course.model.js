import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
    {
      lecturerId: {
        type: String,
        required: true,
      },
      categoryId: {
        type: String,
        required: true,
      },
      pictureId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
      },
      progress: {
        type: Number,
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
);

courseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
courseSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});
  
const Course = mongoose.model("Course", courseSchema);

export default Course;