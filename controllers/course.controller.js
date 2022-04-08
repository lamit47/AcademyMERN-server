import Course from "../models/course.model.js";
import Picture from "../models/picture.model.js";
import Attendance from "../models/attendanceModel.js"
import asyncHandler from "express-async-handler";
import WillLearn from "../models/willLearn.model.js";
import Requirement from "../models/requirement.model.js";
import httpStatusCodes from "../utils/httpStatusCodes.js";
import Track from "../models/track.model.js";
import Step from "../models/step.model.js";
import Progress from "../models/progress.model.js";
import Exam from "../models/exam.model.js";
import Certification from "../models/certification.model.js";
import ExamUser from "../models/examUser.model.js";

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
const getCourses = asyncHandler(async (req, res) => {
  const hostname = process.env.HOSTNAME;
  let { skip, take } = req.query;
  let list = await Course.find({ isDeleted: false }).limit(take).skip(skip).sort('-updatedAt');
  let courses = [];
  if (take < 50) {
    for (let item of list) {
      let course = item.toObject();
      let picture = await Picture.findById(course.pictureId);
      course.picturePath = hostname + picture.picturePath;
      courses.push(course);
    }
  }
  return res.status(httpStatusCodes.OK).send(courses.length === 0 ? list : courses);
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
  let userId = req.user.id;
  const attendance = await Attendance.findOne({ userId: userId, courseId: req.params.id })

  if (!attendance) {
    const newAttendance = new Attendance({
      userId: userId,
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

// registed 
const getRegisted = asyncHandler(async (req, res) => {
  let userId = req.user.id;

  const attendance = await Attendance.findOne({ userId: userId, courseId: req.params.id })
  if (attendance) {
    res.status(200).json(true)
  } else {
    res.status(200).json(false)
  }
})

// get registed course
const getRegistedUsers = asyncHandler(async (req, res) => {
  let userId = req.params.id;

  const attendances = await Attendance.find({ userId: userId})

  let listCourses = [];
  for (const course of attendances) {
    let obj = await Course.findById({_id: course.courseId});
    listCourses.push(obj);
  }

  if (!listCourses) {
    res.status(401).json({ status: 'error', message: 'not found' })
  } else {
    res.status(200).json(listCourses)
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

// GET tracks
const getTrackByCourseId = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let tracks = await Track.find({courseId: id});

  if (!tracks) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }
  
  res.status(httpStatusCodes.OK).json(tracks);
})

// GET track steps
const getStepByCourseId = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let tracks = await Track.find({courseId: id});

  if (!tracks) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  }
  let listTracks = [];
  for (let track of tracks) {
    let trackObj = track.toObject();

    delete trackObj.isDeleted;
    delete trackObj.createdAt;
    delete trackObj.updatedAt;

    const steps = await Step.find({trackId: track.id }) 

    let listSteps = [];
    for (const step of steps) {
      let newStep = step.toObject();
     
      let progress = await Progress.find({stepId: newStep.id, userId: req.user.id});

      delete newStep.content;
      delete newStep.embedLink;
      if (progress.length == 0) {
        newStep.completed = false;
      } else {
        newStep.completed = true;
      }
      listSteps.push(newStep);
    }
  
    trackObj.steps = listSteps;
    listTracks.push(trackObj);
  }

  res.status(httpStatusCodes.OK).json(listTracks);
})

//GET course exams
const getExamsCourse = asyncHandler(async (req, res) => {

  let exams = await Exam.find({courseId: req.params.id});

  if (!exams) {
    res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'not found' });
  } else {
    res.status(200).json(exams);
  }
})

//GET  certify
const getCertifications = asyncHandler(async (req, res) => {
  let userId = req.params.id;

  let certifications = await Certification.find({userId: userId});

  if (!certifications) {
    res.status(httpStatusCodes.NOT_FOUND).json({message: "not found!"})
  } else {
    delete certifications.id;

    res.status(httpStatusCodes.OK).json(certifications);
  }

})

//POST certify
const postCertify = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  let exams = await Exam.find({courseId: courseId, userId: userId, isDeleted: false});
  if (!exams) {
    res.status(httpStatusCodes.NOT_FOUND).json({message: "not found!"})
  }

  let total = 0;
  let i = 0;
  for (const exam of exams) {
    let examUsers = await ExamUser.find({examId: exam.id, userId: userId}).sort([['mark', -1]])
    let examUser = examUsers[0];
    
    if (examUser != null && examUser.mark >= 4) {
      total += examUser.mark;
      i += 1;
    }
  }
  let mark = total / i;
  if (mark >= 4) {
    let certification = new Certification({
      userId: userId,
      courseId: courseId,
      mark: mark
    });
    await certification.save();
    res.status(200).json(true);
  }
  res.status(200).json(true); 
})

export {
  postCourse, getCourses, getCourseById, putCourseById, deleteCourseById, postRegisterCourse, getRegistedUsers, getRegisted, getWillLearns, getRequirements, getTrackByCourseId, getStepByCourseId
  , getExamsCourse, getCertifications, postCertify
}