import mongoose from 'mongoose';

const pictureSchema = mongoose.Schema(
    {
      picturePath: {
        type: String,
        required: true
      },
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
  
const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;