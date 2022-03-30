import Picture from "../models/pictureModel.js";
import multer from "multer";
import mongoose from 'mongoose';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
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
    const picture = new Picture({
      _id: new mongoose.Types.ObjectId(),    
      picturePath: req.file.path 
    });
    picture
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
            id: result._id,
            picturePath: "http://localhost:5000/" + result.picturePath.substring(8)
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
    uploadPicture,
    newPicture  //include the new guy
};



