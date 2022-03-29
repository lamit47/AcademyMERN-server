import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        Email: {
            type: String,
            required: true,
            unique: true,
        },
        PasswordHash: {
            type: String,
            required: true,
        },
        FirstName: {
          type: String,
          required: true,
        },
        LastName: {
            type: String,
            required: true,
          },
        Credits: {
            type: Number,
            required: true,
        },
        PictureId: {
            type: String,
            required: true,
      },
    },
    {
      timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.PasswordHash);
  };

userSchema.pre("save", async function (next) {
if (!this.isModified("PasswordHash")) {
        next();
}
    const salt = await bcrypt.genSalt(10);
    this.PasswordHash = await bcrypt.hash(this.PasswordHash, salt);
});
  
const User = mongoose.model("User", userSchema);

export default User;
