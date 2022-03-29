import mongoose from "mongoose";

const pictureSchema = mongoose.Schema(
    {
      PicturePath: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true,
    }
);


const Picture = mongoose.model("Picture", pictureSchema);

export default Picture;