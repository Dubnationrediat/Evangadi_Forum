import connectionInfo from "../databaseConfig.js";
import  bcrypt from 'bcryptjs'
let register = (req,res)=>{
    
    const {user_first_name,user_last_name,user_name, user_email, user_password} = req.body

    if(!user_name||!user_first_name||!user_last_name||!user_email||!user_password){
        res.status(400).send({
            message : "all input fields are required"
        })
    }else{
        if(user_password.length<8){
            res.status(400).send({
                message : "password should contain at list 8 characters"
            })
        }else{
            connectionInfo.query(`SELECT * FROM registrations WHERE user_email=?`,[user_email],(err,data,field)=>{
                if(err){
                    res.send({
                        messageToTheFront :'Oops..try again',
                        navigation : '/signup',
                        messageToUser:'click here to try again',
                    })
                }else{
                    if(data.length>0){
                        res.send({
                            messageToTheFront :'email already registered',
                            navigation : '/login',
                            messageToUser:'click here to login',
                        })
                    }else{
                      const salt = bcrypt.genSaltSync()
                     let  hashPassword = bcrypt.hashSync(user_password,salt)
                        let registerQuery = `INSERT INTO registrations (user_first_name,user_last_name,user_name, user_email, user_password,user_role,user_OTP)VALUES(?)`
                        let value = [user_first_name,user_letast_name,user_name, user_email, hashPassword,0,0]
                        connectionInfo.query(registerQuery,[value],(err,data,field)=>{
                            if(err){
                                console.log(err.message)
                            }else{
                                let forProfile = `INSERT INTO profiles(user_id,user_first_name,user_last_name)VALUES(?)`
                                let value = [data.insertId,user_first_name,user_last_name]
                                connectionInfo.query(forProfile,[value],(err,data,field)=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                        res.send({
                                            messageToTheFront :'registered successfully and profile created',
                                            navigation : '/login',
                                            messageToUser:'click here to login',
                                        })
                                    }
                                })
                                // console.log(data.insertId)
                                
                            }
                        })
                    }
                }
            })
        }
    }
    
}
export default register;
