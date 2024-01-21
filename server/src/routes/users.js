import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel } from '../models/User.js';

const router = express.Router(); // to set this up as a router

router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    // if !null (user already exists)
    if (user) {
        return res.json({ message: 'User already exists!' });
    }

    // hash pw
    const hashedPw = await bcrypt.hash(password, 10);

    // add user and hashed pw to database
    const newUser = new UserModel({ username, password: hashedPw });
    await newUser.save(); // make the changes to the db

    // if successful
    res.json({ message: 'User successfully registered.'});
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
});

export { router as userRouter }; // export everything as a userRouter object