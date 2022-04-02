import mongoose from 'mongoose';

const pictureSchema = mongoose.Schema(
    {
      picturePath: {
        type: String,
        required: true
      }
    },
    {
      versionKey: false
    }
);

// Duplicate the ID field.
pictureSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
pictureSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {
    delete ret._id
  }
});
  
const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;