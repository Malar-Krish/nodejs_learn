import {User} from '../model/user.js';
import {} from '../db/mongoose.js';
import multer from 'multer';

const docUpload = multer({ 
    dest: 'public/upload/${req.user._id}', 
    limits: { fileSize: 5000000 }, // 5MB for docs
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
            return cb(new Error('Please upload a PDF or Word document'), false);
        }
   
        cb(null, true);
    }
});

const profileUpload = multer({ 
    dest: 'public/upload/${req.user._id}', 
    limits: { fileSize: 1000000 }, // 1KB for profile
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
   
        cb(null, true);
    }
});

const allFileUpload = multer({ 
    dest: 'public/upload/${req.user._id}', 
    limits: { fileSize: 1000000 }, // 1KB for profile
});

export const uploadFile = (req, res) => {
    let singleUpload;

    if (req.query.type === 'image') {
         singleUpload = profileUpload.single('upload');
    }else if(req.query.type === 'document') {
        singleUpload = docUpload.single('upload');
    }else{
        singleUpload = allFileUpload.single('upload');
    }

    singleUpload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ 'success' : false, error: err.message });
        }
        
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        res.send({
            message: 'File uploaded successfully',
            file: req.file
        });
    });
};

