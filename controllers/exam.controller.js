import asyncHandler from 'express-async-handler';
import Exam from '../models/exam.model.js';
import ExamQuestion from '../models/examquestion.model.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';
import mongoose from 'mongoose';


// Create exam
const createExam = asyncHandler(async (req, res) => {
  let { courseId, title, examDuration } = req.body;

  if (!courseId) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập courseId' });
  }
  if (!title) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập title' });
  }
  if (!examDuration || typeof examDuration !== 'number') {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập đúng examDuration' });
  }

  let exam = new Exam({ courseId, title, examDuration });
  exam = await exam.save();
  return res.status(httpStatusCodes.OK).json(exam);
});

//Find exam
const getByExamId = asyncHandler(async (req, res) => {
  let id = req.params.examId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let exam = await Exam.findById(id);

  if (!exam) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy bài kiểm tra này' });
  }
  return res.status(httpStatusCodes.OK).json(exam);
});

//Update exam
const updateExam = asyncHandler(async (req, res) => {
  let id = req.params.examId;
  let { title, examDuration }  = req.body;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  if (!title) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập title' });
  }
  if (!examDuration || typeof examDuration !== 'number') {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập đúng examDuration' });
  }
  let exam = await Exam.findById(id);

  if (!exam) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy bài kiểm tra này' });
  }
  exam.title = title;
  exam.examDuration = examDuration;
  exam = await exam.save();
  return res.status(httpStatusCodes.OK).json(exam);
});

//Delete exam
const deleteExam = asyncHandler(async (req, res) => {
  let id = req.params.examId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let exam = await Exam.findById(id);

  if (!exam) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy bài kiểm tra này' });
  }
  exam.isDeleted = true;
  exam = await exam.save();
  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

//Create question
const createQuestion = asyncHandler(async (req, res) => {
  let id = req.params.examId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let exam = await Exam.findById(id);

  if (!exam) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy bài kiểm tra này' });
  }
  
  let { question, options, rightOption } = req.body;

  if (!question || !options || !rightOption) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({status: false, message: 'Vui lòng nhập đầy đủ các fields'});
  }

  let objectId = mongoose.Types.ObjectId(id);

  let examQuestion = new ExamQuestion({ question, options, rightOption });
  //examQuestion.examId = objectId;
  examQuestion = await examQuestion.save();

  let resFormat = examQuestion.toObject();

  return res.status(httpStatusCodes.OK).json(handlerRes(resFormat));
});

//update question
const updateQuestion = asyncHandler(async (req, res) => {
  let id = req.params.questionId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let examQuestion = await ExamQuestion.findById(id);

  if (!examQuestion) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm câu hỏi này' });
  }
  
  let { content, options, rightOption } = req.body;

  if (!content || !options || !rightOption) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({status: false, message: 'Vui lòng nhập đầy đủ các fields'});
  }

  examQuestion.content = content;
  examQuestion.options = options;
  examQuestion.rightOption = rightOption;
  examQuestion = await examQuestion.save();

  return res.status(httpStatusCodes.OK).json(examQuestion);
});

//delete question
const deleteQuestion = asyncHandler(async (req, res) => {
  let id = req.params.questionId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let examQuestion = await ExamQuestion.findById(id);

  if (!examQuestion) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm câu hỏi này' });
  }

  examQuestion.isDeleted = true;
  examQuestion = await examQuestion.save();

  return res.status(httpStatusCodes.OK).json({ status: 'success' });
});

//Get list questions of exam
const getListQuestions = asyncHandler(async (req, res) => {
  let id = req.params.examId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let exam = await Exam.findById(id);

  if (!exam) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy bài kiểm tra này' });
  }

  let objectId = mongoose.Types.ObjectId(id);
  let data = await ExamQuestion.find({ 'examId': objectId }).select('-rightOption -options');

  return res.status(httpStatusCodes.OK).json(data);
});

//Get question
const getQuestion = asyncHandler(async (req, res) => {
  let id = req.params.questionId;
  if (!id) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({ status: 'error', message: 'Vui lòng nhập id' });
  }
  let examQuestion = await ExamQuestion.findById(id);

  if (!examQuestion) {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu hỏi này' });
  }
  return res.status(httpStatusCodes.OK).json(examQuestion);
});

//GET exam questions
const getExamQuestions = asyncHandler(async (req, res) => {
  let id = req.params.examId;

  let examQuestions = await ExamQuestion.find({examId : id});

  if (examQuestions) {

    let resFormat = examQuestions.map(questions => {
      let questionObj = questions.toObject();
      return handlerRes(questionObj);
    })  

    return res.status(httpStatusCodes.OK).json(resFormat);
  } else {
    return res.status(httpStatusCodes.NOT_FOUND).json({ status: 'error', message: 'Không tìm thấy câu hỏi nào' });
  }
})

//GET test
const getResult = asyncHandler(async (req, res) => {
  //here
})

const handlerRes = (resFormat) => {
  let examId = resFormat.question.examId;
  let content = resFormat.question.content;
  let optionsArr = resFormat.options;
  let i = resFormat.rightOption.index;
  
  resFormat.question = {
    id: resFormat.id,
    examId: examId,
    content: content,
    isDeleted: resFormat.isDeleted
  }

  resFormat.options = optionsArr.map(option => {
    return {
      id: option._id,
      questionId: resFormat.id,
      content: option.content
    }
  })

  resFormat.rightOption = {
    questionId: resFormat.id,
    optionId: resFormat.options.find((option, index) => index == i).id,
    index: i
  }

  delete resFormat.isDeleted;
  delete resFormat.id;
  delete resFormat.createdAt;
  delete resFormat.updatedAt;

  return resFormat;
}

export { 
  createExam, 
  getByExamId, 
  updateExam, 
  deleteExam, 
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getListQuestions,
  getQuestion,
  getExamQuestions
};