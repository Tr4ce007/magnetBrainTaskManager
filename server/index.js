import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import taskRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} http://localhost:5000${req.url}`);
  next();
});

app.use('/auth',authRoutes);

app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);



const PORT = process.env.PORT|| 5000;

app.get('/',(req,res) => {
  res.send('Welcome to Task Manager API.');
});


mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  mongoose.set('useFindAndModify', false);