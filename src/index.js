import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import posts from '../routers/posts.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.port || 3000;
const app = express()

const URI = process.env.DATABASE_URL;

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.get('/',(req, res) => {
  res.send('Hello world!!!')
})

app.use('/posts',posts);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to DB');
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
  })
}).catch((err) => {
  console.log('err',err);
});
