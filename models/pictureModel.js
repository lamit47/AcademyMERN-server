import mongoose from 'mongoose';

const pictureSchema = mongoose.Schema(
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      picturePath: {
        type: String,
        required: true
      }
    },
    {
      versionKey: false
    }
);
  
const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;