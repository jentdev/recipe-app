import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { UserModel } from '../models/User.js';

dotenv.config();

const router = express.Router(); // to set this up as a router

const secret = process.env.SECRET;
console.log(secret);

router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    // if !null (user already exists)
    if (user) {
        return res.json({ message: 'User already exists!' });
    }

    // hash pw
    const hashedPw = await bcrypt.hash(password, 10);

    console.log(hashedPw);

    // add user and hashed pw to database
    const newUser = new UserModel({ username, password: hashedPw });
    await newUser.save(); // make the changes to the db

    // if successful
    res.json({ message: 'User successfully registered.'});
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    // if we don't find user
    if (!user) {
        return res.json({ message: "User doesn't exist."});
    }

    const isPwValid = await bcrypt.compare(password, user.password);

    if(!isPwValid) {
        return res.json({ message: "Username or Password is incorrect."});
    }

    const token = jwt.sign( {id: user._id }, secret);
    res.json({ token, userID: user._id });
});

export { router as userRouter }; // export everything as a userRouter object

// middleware
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err) => {
            if (err) return res.sendStatus(403); // not authorized
            next();
        });
    }
    else {
      res.sendStatus(401);
    }
};