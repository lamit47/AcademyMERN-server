import Course from "../models/courseModel.js";
import Picture from "../models/pictureModel.js";
import mongoose from "mongoose";

// create a course
const postCourse = async (req, res) => {
  const { lecturerId, categoryId, pictureId, title, description, credits } = req.body;

  const a = 0;

  const picPath = await Picture.findById( mongoose.Types.ObjectId(pictureId), 'picturePath').lean();

  const course = new Course({
    // _id: mongoose.Types.ObjectId(),
    lecturerId: lecturerId,
    categoryId: categoryId,
    pictureId: pictureId,
    title: title != null ? title : "",
    description: description != null ? description : "",
    credits: credits,
    isDeleted: false, 
    picturePath: picPath != null ? picPath.picturePath : "http://localhost:5000/default.jpg",
    progress: 0
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
        progress: result.progress
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })

};

// get all course
const getCourse = (req, res) => {

  Course.find().then(courseObj => {
    res.status(201).json(
      courseObj.map((value) => {
        return {
          id: value._id,
          lecturerId: value.lecturerId,
          categoryId: value.categoryId,
          pictureId: value.pictureId,
          title: value.title,
          description: value.description,
          credits: value.credits,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
          isDeleted: value.isDeleted,
          picturePath: value.picturePath,
          progress: value.process
        }
      })
      
    );
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}



export {
  postCourse, getCourse
}