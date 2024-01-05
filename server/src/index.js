import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json()); // convert front-end data to json
app.use(cors()); // set communication between front and backend

app.listen(3001, () => console.log("server started!"));