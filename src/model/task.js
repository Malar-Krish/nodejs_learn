import mongoose from 'mongoose'

// 1. Create Schema 
const taskSchema = mongoose.Schema({
    description :{
        type : String
    },
    status : {
        type : String,
        default : "new"
    },
    name : {
        type : String,
        required : true
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updated_by : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

taskSchema.statics.checkObjectId = async function (_id) {
    if (!mongoose.isValidObjectId(_id)) {
        return true;
    }
}

// 2. Create the Model from the Schema
export const Task=mongoose.model('tasks',taskSchema)
