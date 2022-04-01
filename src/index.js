import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorHandler, notFound } from '../middlewares/errorMiddleware.js';

import blogRouter from '../routers/blogRouter.js';
import userRouter from '../routers/userRouter.js';
import categoryRouter from '../routers/categoryRouter.js';
import blogCommentRouter from '../routers/blogCommentRouter.js';
import willLearnRouter from '../routers/willLearnRouter.js';
import pictureRouter from '../routers/pictureRouter.js';
import courseRouter from '../routers/courseRouter.js';
import requirementRouter from '../routers/requirementRouter.js';
import questionRouter from '../routers/questionRouter.js';
import answerRouter from '../routers/answerRouter.js';


dotenv.config();

const port = process.env.port || 5000;
const app = express()

const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());
app.use(express.json());


app.get('/',(req, res) => {
  res.send('Hello world!!!')
})

app.use('/api/blog', blogRouter);

app.use('/api/category', categoryRouter);

app.use('/api/users', userRouter);

app.use('/api/blogComment', blogCommentRouter);

app.use('/api/willLearn', willLearnRouter);

app.use('/api/picture/upload' , pictureRouter);

app.use('/api/course' , courseRouter);

app.use('/api/requirement' , requirementRouter);

app.use('/api/question' , questionRouter);

app.use('/api/answer' , answerRouter);







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
