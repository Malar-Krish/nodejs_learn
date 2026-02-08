import {User} from '../model/user.js';
import {} from '../db/mongoose.js';

export const getAllUsers = async (req, res) => {
        const is_json=req.header('is_json')
        const { email, id,name } = req.query;
        const filter = {};

        if (email) filter.email = email;
        if (id) filter._id = id;
        if (name) filter.fname ={ $regex: name, $options: 'i' }; 

        const users = await getUserList(0,filter,res); 
        if(is_json==1){
            res.status(200).json({'success' : true , 'list' : users});
        }else{
            res.render('user/edit', { users });
        }
};

export const getUser = async (req, res) => {
        const is_json=req.header('is_json')
        const filter = {};
        const users = await getUserList(req.params.id,filter,res) ;
        if(is_json==1){
            res.status(200).json({'success' : true , 'list' : users});
        }else{
            res.render('user/edit', { users });
        }
};

const getUserList= async (id,filter,res) => {
   try {
      const users = (id.length > 0) ? await User.findById(id).lean() : await User.find(filter).lean();
      return users;
    } catch (error) {
        res.status(500).json({'error' : 'Error fetching users'});
    }
}

export const createUser = async (req, res) => {
    const is_json=req.header('is_json')
  try {
        const user = new User(req.body); 
        const savedUser = await user.save();
        if(is_json == 1){
            res.status(200).json({"success":true ,"message": "User Saved successfully!","user":savedUser});
        }else{
            req.flash('success_msg', 'User Saved successfully!');
            res.redirect('/user/list');
        }
        
    } catch (error) {
        console.error('Error saving user:', error.message);
        if(is_json == 1) {
            res.status(500).json({'success' : false , 'message' : 'User Not Saved' , 'Error' : error.message})
        }else{
            req.flash('error_msg', 'User not found');
            res.redirect('/user/list');
        }
    }
};

export const updateUser = async (req, res) => {
    const isValid=await User.checkObjectId(req.params.id)
    const is_json=req.header('is_json')
    if(isValid){
        if(is_json == 1){
            res.status(200).json({"success":false ,"message": "user not found"});
        }else{
            req.flash('error_msg', 'User not found');
            res.redirect('/user/list');
        }
    }
 
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );

        if(is_json == 1){
            res.status(200).json({"success":true ,"message": "User updated successfully!","user":updatedUser});
        }else{
            req.flash('success_msg', 'User Updated successfully!');
            res.redirect('/user/list');
        }
        
    } catch (error) {
        console.error('Error update user:', error.message);
        if(is_json == 1) {
            res.status(500).json({'success' : false , 'message' : 'User Not  updated' , 'Error' : error.message})
        }else{
            req.flash('error_msg', 'User not found');
            res.redirect('/user/list');
        }
    }
};


export const deleteUser = async (req, res) => {
    const isValid=await User.checkObjectId(req.params.id)
    const is_json=req.header('is_json')
    console.log(is_json)
    if(isValid){
        if(is_json == 1){
            res.status(200).json({"success":false ,"message": "user not found"});
        }else{
            req.flash('error_msg', 'User not found');
            res.redirect('/user/list');
        }
    }

    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if(is_json == 1){
            res.status(200).json({"success":true ,"message": "User deleted successfully!"});
        }else{
            req.flash('success_msg', 'User deleted successfully!');
            res.redirect('/user/list')
        }
       
        
    } catch (error) {
        console.error('Error Delete user:', error.message);
        if(is_json == 1) {
            res.status(500).json({'success' : false , 'message' : 'User Not deleted' , 'Error' : error.message})
        }else{
            req.flash('error_msg', 'User not found');
            res.redirect('/user/list');
        }
    }
};

export const userLogin= async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.json({'success' : true ,user,token});
    } catch (e){
        console.log(e)
        res.status(400).json({'success' : false,'error' : e});
    }
}

export const userLogout = async (req,res) => {
    try {
        req.user.tokens=req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();
        res.status(200).json({'success' : true ,'message' : 'User logged out successfully'});
    } catch (e) {
        res.status(500).json({'success' : false,'error' : e});
    }
}

export const userLogoutAll = async (req,res) => {
    try {
        req.user.tokens= [];
        await req.user.save();
        res.status(200).json({'success' : true ,'message' : 'User logged out successfully'});
    } catch (e) {
        res.status(500).json({'success' : false,'error' : e});
    }
}



        