import Picture from "../models/picture.model.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import httpStatusCodes from "../utils/httpStatusCodes.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    //https://stackoverflow.com/a/39650303
    let fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const uploadPicture = upload.single('file');

const newPicture = (req, res, next) => {
  let path = req.file.path;
  const picture = new Picture({
    picturePath: path
  });
  picture
    .save()
    .then(result => {
      res.status(httpStatusCodes.OK).json({
        id: result._id,
        picturePath: result.picturePath
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

export {
  uploadPicture, newPicture  //include the new guy
};


