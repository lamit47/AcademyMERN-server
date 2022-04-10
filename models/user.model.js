import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    scope: [{
      type: String
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Duplicate the ID field.
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id;
    if (ret.picture && ret.picture !== "/") {
      let hostname = process.env.HOSTNAME;
      ret.picture = hostname + ret.picture;
    }
  }
});

// Ensure virtual fields are serialised.
userSchema.set('toObject', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret.id;
    if (ret.picture && ret.picture !== "/") {
      let hostname = process.env.HOSTNAME;
      ret.picture = hostname + ret.picture;
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;