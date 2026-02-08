import express from 'express'
export const userRoutes = express.Router();
import {getAllUsers,createUser,getUser,updateUser,deleteUser,userLogin,userLogout,userLogoutAll}  from '../controllers/UserController.js'
import {auth} from '../middleware/auth.js'

userRoutes.post('/user/login', userLogin);

userRoutes.use(auth);
userRoutes.get('/user/listAll', getAllUsers);
userRoutes.post('/user/create', createUser);
userRoutes.get('/user/edit/:id', getUser);
userRoutes.patch('/user/update/:id', updateUser);
userRoutes.delete('/user/delete/:id', deleteUser);
userRoutes.get('/user/logout', userLogout);
userRoutes.get('/user/logoutAll', userLogoutAll);




