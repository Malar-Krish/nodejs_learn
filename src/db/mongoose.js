import mongoose from 'mongoose'
import 'dotenv/config';

console.log("Database connection done")
mongoose.connect(process.env.MONGO_URI)

