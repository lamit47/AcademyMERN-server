import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import posts from '../routers/posts.js';
import blogRouter from '../routers/blogRouter.js';
import userRouter from '../routers/user.route.js';
import authRouter from '../routers/auth.router.js';
import categoryRouter from '../routers/categoryRouter.js';
import examRouter from '../routers/exam.router.js';
import { errorHandler, notFound } from '../middlewares/errorMiddleware.js';

dotenv.config();

const port = process.env.port || 5000;
const app = express()

const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());


app.get('/',(req, res) => {
  res.send('Hello world!!!')
})

app.use('/posts',posts);

app.use('/api/blog', blogRouter);

app.use('/api/category', categoryRouter);

// app.use('/api/users', userRouter);


app.use('/api/exam', examRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);



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
