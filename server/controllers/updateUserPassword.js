import bcrypt from 'bcryptjs'
import connectionInfo from '../databaseConfig.js';

let updatePassword = (req,res)=>{
     const {userPassword,user_id}=req.body
     let salt = bcrypt.genSaltSync();
     let hashPassword = bcrypt.hashSync(userPassword,salt)
     let updateDB = `UPDATE registrations SET user_password='${hashPassword}' WHERE user_id = '${user_id}'`
     connectionInfo.query(updateDB,(err,data,field)=>{
         if(err){
            console.log(err.message)
         }else{
             res.json({
                messageToTheFront :'password updated successfully',
                navigation : '/login',
                messageToUser:'click here for logging in',
             })
         }
     })
}

export default updatePassword