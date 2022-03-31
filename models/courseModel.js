import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
      credits: {
        type: Number,
        required: true,
      },
      isDeleted: {
        type: Boolean,
      },
      picturePath: {
        type: String,
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

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };

// userSchema.pre("save", async function (next) {
// if (!this.isModified("password")) {
//         next();
// }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });
  
const Course = mongoose.model("Course", courseSchema);

export default Course;