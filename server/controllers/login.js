import connectionInfo from "../databaseConfig.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
let login = (req,res)=>{
    const {email,password}=req.body
    // *validator
    if(!email || !password){
        res.send({
            message : "all fields are required"
        })
    }else{
        let userChecker = `SELECT user_email from registrations `
        let forPasswordCheck = `SELECT user_password,user_id,user_name from registrations WHERE user_email = '${email}'`
        connectionInfo.query(userChecker,(err,data,fields)=>{
            if(err){
                console.log(err.message)
            }else{
                  if(data){
                    let resultFilter = data.find((emails)=>{
                        return  emails.user_email ===email
                    })
                   if(resultFilter){
                        connectionInfo.query(forPasswordCheck,(err,result,filed)=>{
                            if(err){
                                console.log(err.message)
                            }else{
                                let compare = bcrypt.compareSync(password,result[0].user_password)
                                if(!compare){
                                    res.send({
                                        messageToTheFront :"password not correct please try again", 
                                        messageToUser:"click here for login",
                                        navigation: "/login",
                                    })
                                }else{
                                     const token = jwt.sign({id:result[0].user_id,  display_name:result[0].user_name},process.env.JWT_SECRET,{expiresIn:"4h"})                               
                                     res.send({
                                         token,
                                     })
                                }
                            }
                        })
                   }else{
                    res.send({
                        messageToTheFront :"no registered user by this credential please sign up", 
                        messageToUser:"click here for login",
                        navigation: "/signup"
                    })
                   }
                  }
            }
        })
    }
}

export default login 