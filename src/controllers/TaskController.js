import {Task} from '../model/task.js';
import {} from '../db/mongoose.js';

export const taskSave = async (req,res) => {
    try{
        const task = new Task(req.body);
        task.created_by = req.user._id;
        task.updated_by = req.user._id;
        const savedTask = await task.save();

        res.status(200).json({'success': true, 'message' : 'Task saved successfully','task' : savedTask})
    }catch (e) {
        res.status(500).json({'success' : false , 'message' : 'Task Not Saved' , 'Error' : e})
    }
}

export const taskUpdate = async (req,res) => {
    const isValid=await Task.checkObjectId(req.params.id)
    if(isValid){
        res.status(200).json({"success":false ,"message": "user not found"});
    }

    try{
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );
        
        res.status(200).json({"success":true ,"message": "Task updated successfully!","task":updatedTask});
    } catch (e) {
        res.status(200).json({"success":false ,"message": "Task not found",'error': e});
    }
}

export const taskDelete = async (req,res) => {
    const isValid=await Task.checkObjectId(req.params.id)
    if(isValid){
        res.status(200).json({"success":false ,"message": "Task not found"});
    }

    try{
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id,created_by : req.user._id });
        res.status(200).json({"success":true ,"message": "Task deleted successfully!"});
    } catch (e) {
        res.status(2050).json({"success":false ,"message": "Task not found",'error': e});
    }
}

export const taskListAll = async (req, res) => {
        const { id,name ,status,start,limit } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (id) filter._id = id;
        if (name) filter.name ={ $regex: name, $options: 'i' }; 
        if (req.user.role !== 'admin') filter.user_id = req.user._id;
        const startNum = parseInt(start) || 0; 
        const limitNum = parseInt(limit) || 0;
 

        const totalTasks = await Task.countDocuments(filter);

        const query = Task.find(filter).populate('user_id').sort({ createdAt: -1 }).lean(); 

        if (limitNum > 0) {
            query.skip(startNum).limit(limitNum);
        } 

        const tasks = await query;
        
        res.status(200).json({'success' : true,'total' : totalTasks , 'list' : tasks});
};