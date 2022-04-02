import Course from "../models/courseModel.js";
import Picture from "../models/picture.model.js";
import Attendance from "../models/attendanceModel.js"
import asyncHandler from "express-async-handler";
import WillLearn from "../models/willLearn.model.js";
import Requirement from "../models/requirement.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";

// create a course
const postCourse = asyncHandler(async (req, res) => {
  const { lecturerId, categoryId, pictureId, title, description } = req.body;

  const course = new Course({
    lecturerId: lecturerId,
    categoryId: categoryId,
    pictureId: pictureId,
    title: title != null ? title : "",
    description: description != null ? description : "",
    isDeleted: false,
    progress: 0
  });

  course.save().then(result => {
    res.status(200).json(course);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })

})

// get all course
const getCourse = asyncHandler((req, res) => {
  Course.find().then(courseArr => {
    res.status(200).json([...courseArr.map(course => course)]);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err()
    });
  });
})

// get by id
const getCourseById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const hostname = process.env.HOSTNAME;

  const course = await Course.findById(id);

  if (course) {
    let courseRes = JSON.stringify(course, null, 4)
    courseRes = JSON.parse(courseRes)
    let picPath = await Picture.findById(courseRes.pictureId);
    courseRes.picturePath = hostname + picPath.picturePath;

    res.status(200).json({ ...courseRes });
  } else {
    res.status(401);
    throw new Error("Invalid Id");
  }
})

// update course
const putCourseById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const hostname = process.env.HOSTNAME;
  let { title, description, categoryId, pictureId } = req.body;

  let course = await Course.findById(id);

  if (course) {
    course.title = title;
    course.description = description;
    course.categoryId = categoryId;
    course.pictureId = pictureId;
    course = await course.save();
    let courseRes = JSON.stringify(course, null, 4);
    courseRes = JSON.parse(courseRes);
    let picPath = await Picture.findById(courseRes.pictureId);
    courseRes.picturePath = hostname + picPath.picturePath;

    res.status(200).json({ ...courseRes });
  } else {
    res.status(401);
    throw new Error("Invalid Id");
  }
})

// delete course
const deleteCourseById = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.id);

  course.isDeleted = true;

  if (course) {
    await course.save();
    res.json({ message: "Removed success!!!" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
})

// register course
const postRegisterCourse = asyncHandler(async (req, res) => {
  const user = req.user

  const attendance = await Attendance.findOne({ userId: user._id, courseId: req.params.id }).exec()

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
const getRegistedUsers = asyncHandler(async (res, req) => {

  const attendance = Attendance.findOne({ userId: req.user._id, courseId: req.params.id })

  if (attendance) {
    res.status(200).json({ isRegisted: true })
  } else {
    res.status(401).json({ isRegisted: false })
  }
})

// will learns
const getWillLearns = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const willLearn = await WillLearn.find({ courseId: id })

  return res.status(httpStatusCodes.OK).json(willLearn);
})

const getRequirements = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const requirements = await Requirement.find({ courseId: id })

  return res.status(httpStatusCodes.OK).json(requirements);
})

export {
  postCourse, getCourse, getCourseById, putCourseById, deleteCourseById, postRegisterCourse, getRegistedUsers, getWillLearns, getRequirements
}