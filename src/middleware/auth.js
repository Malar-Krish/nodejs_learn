import jwt from 'jsonwebtoken';
import {User} from '../model/user.js';

export const auth = async (req,res,next) => {
    try{
        const api_token=req.header('api-token');
        console.log(api_token)
        const decoded = jwt.verify(api_token,'nodejslearning');
        console.log(decoded._id)
        const user = await User.findOne({_id:decoded._id, 'tokens.token':api_token});

        if(!user){
            throw new Error('Unauthorized');
        }

        req.user=user;
        next();
    }catch (e){
        res.status(401).json({success: false,message:'Unauthorized'})
    }   
}