import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

dotenv.config();

const app = express();

app.use(express.json()); // convert front-end data to json
app.use(cors()); // set communication between front and backend

// apply router
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

app.listen(3001, () => console.log("server started!"));