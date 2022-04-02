import Course from "../models/courseModel.js";
import Picture from "../models/pictureModel.js";
import Attendance from "../models/attendanceModel.js"
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import WillLearn from "../models/willLearnModel.js";

// create a course
const postCourse = asyncHandler ( async (req, res) => {
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
    picturePath: picPath != null ? picPath.picturePath : "default.jpg",
    progress: 0
  });
  
  course.save().then(result => {
    res.status(200).json({
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

})

// get all course
const getCourse = asyncHandler( (req, res) => {
  Course.find().then(courseArr => {
    res.status(200).json([...courseArr.map(course => course)]);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err ()
    });
  });
})

// get by id
const getCourseById = asyncHandler ( async (req, res) => {
  const id = req.params.id;

  const course = await Course.findById(id);

  if (course) {
    let courseRes = JSON.stringify(course, null, 4)
    courseRes = JSON.parse(courseRes)

    res.status(200).json({...courseRes});
  } else {
    res.status(401);
    throw new Error("Invalid Id");
  }
})

// update course
const putCourseById = asyncHandler ( async (req, res) => {
  const id = req.params.id
  const updateCourse = {}

  for (const ops in req.body) {
    updateCourse[ops] = req.body[ops]
  }

  const course = await Course.findOneAndUpdate({_id: id}, updateCourse, { new : true })

  if (course) {
    let courseRes = JSON.stringify(course, null, 4)
    courseRes = JSON.parse(courseRes)
    
    res.status(200).json({...courseRes})
  } else {
    res.status(401);
    throw new Error("Invalid Id");
  }
})

// delete course
const deleteCourseById = asyncHandler( async (req, res, next) => {
     
     const course = await Course.findById(req.params.id);
   
     course.isDeleted = true;

     if (course) {
       await course.save();
       res.json({ message: "Removed success!!!" });
     } else {
       res.status(404);
       throw new Error("Note not Found");
     }
} )

// register course
const postRegisterCourse = asyncHandler( async (req, res) => {
     const user = req.user
     
     const attendance = await Attendance.findOne({userId: user._id , courseId: req.params.id}).exec()

     if (attendance) {
          const newAttendance = new Attendance({
               userId: user._id,
               courseId: req.params.id,
               credits: 0
          })
          await newAttendance.save()
          res.json({ message: "Success!" });
     } else {
          res.status(409);
          throw new Error("Exists");
     }
})

// registed users
const getRegistedUsers = asyncHandler( async (res, req) => {
     
     const attendance = Attendance.findOne({userId: req.user._id, courseId: req.params.id})
     
     if (attendance) {
          res.status(200).json({ isRegisted: true })
     } else {
          res.status(401).json({ isRegisted: false })
     }
} )

// will learns
const getWillLearns = asyncHandler(async (req, res) => {

     const willLearn = await WillLearn.findOne({courseId: req.params.id})

     if (willLearn) {
          let willLearnRes = JSON.stringify(willLearn, null, 4)
          willLearnRes = JSON.parse(willLearnRes)

          res.status(200).json({...willLearnRes})
     } else {
          res.status(401).json({message: "Not found"})
     }
})

export {
  postCourse, getCourse, getCourseById, putCourseById, deleteCourseById, postRegisterCourse, getRegistedUsers, getWillLearns
}