import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// 1. Define the Schema separately
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Note: This requires a fresh DB or manual index build
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Don't use the word 'password'");
            }
        }
    },
    role : {
        type : String,
        default : 'admin'
    },
    phoneno: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Phone number must be positive');
            }
        }
    },
    tokens : [ {
        token :{
        type: String,
        required : true
    }
    }],
    img_url : {
        type : Buffer
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// 2. pre and post works before and after the event and hash the password before saving

userSchema.pre('save', async function() {
    const user =this;

    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }
});

// 3. hash password compare -> statics
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('Unable to login , email not found');
    }

    const isMatch = await bcrypt.compare(password,user.password);
    console.log(isMatch);

    if(!isMatch){
        throw new Error('Unable to login. Password does not matched');
    }
    return user;
}

// 4. methods function 

userSchema.methods.generateAuthToken = async function (){
    const user=this;
    try{
        const token=jwt.sign({_id:user._id.toString() }, process.env.JWT_SECRET);
        user.tokens=user.tokens.concat({token});
        await user.save();
        return token;
    } catch (e){
        throw new Error (e)
    }
    
}
// need to get data based on foreign key
userSchema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'user_id'
})

userSchema.statics.checkObjectId = async function (_id) {
    if (!mongoose.isValidObjectId(_id)) {
        return true;
    }
}

userSchema.statics.toJSON = async function () {
    const user = this ;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// 2. Create the Model from the Schema
export const User = mongoose.model('User', userSchema);


