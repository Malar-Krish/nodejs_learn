import express from 'express'
import path from 'path';
import hbs from 'hbs'
import session from 'express-session';
import flash from 'express-flash';
import chalk from 'chalk'
import {userRoutes} from './routes/userRoutes.js'
import {taskRoutes} from './routes/taskRoutes.js'
import { uploadRoutes } from './routes/uploadRoutes.js';

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(flash());
app.use('/public', express.static('public'));

app.use((req, res, next) => {
    res.locals.success_msg = chalk.green.bold(req.flash('success_msg'));
    res.locals.error_msg = chalk.red.bold(req.flash('error_msg'));
    next();
});
const router =new express.Router()
app.use(router)
app.use(userRoutes);
app.use(taskRoutes);
app.use(uploadRoutes);

const public_path=path.join(import.meta.dirname,'../public')
const views_path = path.join(import.meta.dirname, '../templates/views');
const user_path = path.join(import.meta.dirname, '../templates/views/user');
const partials_path = path.join(import.meta.dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', [views_path,user_path]);
hbs.registerPartials(partials_path)
app.use(express.static(public_path))

router.get('/',(req,res) => {
    res.render('index',{})
})

app.listen(PORT, () => {
    console.log("Server is Running on ",PORT)
})