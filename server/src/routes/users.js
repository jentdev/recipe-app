import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel } from '../models/User.js';

const router = express.Router(); // to set this up as a router

router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    res.json(user);
});

router.post('/login');

export { router as userRouter }; // export everything as a userRouter object