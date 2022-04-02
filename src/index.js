import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler, notFound } from '../middlewares/errorMiddleware.js';

import userRouter from '../routers/user.route.js';
import authRouter from '../routers/auth.router.js';
import categoryRouter from '../routers/category.router.js';
import examRouter from '../routers/exam.router.js';
import questionRouter from '../routers/question.router.js';
import answerRouter from '../routers/answer.router.js';
import blogRouter from '../routers/blog.router.js';
import blogCommentRouter from '../routers/blogComment.router.js';

import pictureRouter from '../routers/picture.router.js'
import courseRouter from '../routers/course.router.js'
import willLearnRouter from '../routers/willLearn.router.js';
import requirementRouter from '../routers/requirement.router.js';


dotenv.config();

const port = process.env.port || 5000;
const app = express()

const URI = process.env.DATABASE_URL;

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());


app.get('/',(req, res) => {
  res.send('Hello world!!!')
})

app.use('/api/blog', blogRouter);

app.use('/api/category', categoryRouter);


app.use('/api/exam', examRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use('/api/blogComment', blogCommentRouter);

app.use('/api/willLearn', willLearnRouter);

app.use('/api/picture/upload' , pictureRouter);

app.use('/api/course' , courseRouter);

app.use('/api/requirement' , requirementRouter);

app.use('/api/question' , questionRouter);

app.use('/api/answer' , answerRouter);

app.use('/api/Picture/Upload' , pictureRouter);

app.use('/api/Course' , courseRouter);

app.use(notFound);
app.use(errorHandler);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to DB');
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
  })
}).catch((err) => {
  console.log('err',err);
});











