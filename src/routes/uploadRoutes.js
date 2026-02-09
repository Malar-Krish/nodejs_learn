import express from 'express'
export const uploadRoutes = express.Router();
import {uploadFile}  from '../controllers/UploadController.js'
import {auth} from '../middleware/auth.js'

uploadRoutes.use(auth);
uploadRoutes.post('/upload', uploadFile);




