import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { User } from "../../src/model/user";

export const userOneId = new mongoose.Types.ObjectId();

export const userOne = {
    _id : userOneId,
    fname : 'Test Creds User',
    email : 'testcreds@gmail.com',
    password : 'test@123',
    tokens : [{
        token: jwt.sign({_id : userOneId} , process.env.JWT_SECRET)
    }]
}

export const setupDatabase = async () => {
    await User.deleteMany({ email: 'testcreds@email.com' });
    await new User(userOne).save();
}