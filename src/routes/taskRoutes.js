import express from 'express'
export const taskRoutes = express.Router();
import {taskSave,taskUpdate,taskDelete,taskListAll}  from '../controllers/TaskController.js'
import {auth} from '../middleware/auth.js'

taskRoutes.use(auth);
taskRoutes.get('/task/listAll', taskListAll);
taskRoutes.post('/task/save', taskSave);
taskRoutes.put('/task/update/:id', taskUpdate);
taskRoutes.delete('/task/delete/:id', taskDelete);






