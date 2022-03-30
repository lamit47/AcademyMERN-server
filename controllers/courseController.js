import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";
import Picture from "../models/pictureModel.js";

const postCourse = (req, res) => {
  const { lecturerId, categoryId, pictureId, title, description, credits } = req.body;

  const picPath = Picture.findById(pictureId, function (err, docs) {
    if (err){
        console.log(err);
    }
    else {
        return docs;
    }
});

  const course = new Course({
    // _id: mongoose.Types.ObjectId(),
    lecturerId: lecturerId,
    categoryId: categoryId,
    pictureId: pictureId,
    title: title != null ? title : "",
    description: description != null ? description : "",
    credits: credits,
    isDeleted: true,
    picturePath: picPath,
    process: 0
  });

  course.save().then(result => {
    console.log(result);
    res.status(201).json({
        id: result._id,
        lecturerId: result.lecturerId,
        categoryId: result.categoryId,
        pictureId: result.pictureId,
        title: result.title,
        description: result.description,
        credits: result.credits,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        isDeleted: result.isDeleted,
        picturePath: result.picturePath,
        progress: result.process
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })

};

export {
  postCourse
}