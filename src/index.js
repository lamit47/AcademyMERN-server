import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import posts from '../routers/posts.js';
import authRouter from '../routers/authRouter.js';
import blogRouter from '../routers/blogRouter.js';
import categoryRouter from '../routers/categoryRouter.js';
import { errorHandler, notFound } from '../middlewares/errorMiddleware.js';

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

app.use('/posts',posts);

app.use('/api/users', authRouter);

app.use('/api/blog', blogRouter);

app.use('/api/category', categoryRouter);



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
