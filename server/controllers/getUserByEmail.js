import connectionInfo from "../databaseConfig.js";

let getUserByEmail = (req,res)=>{
    const {email} = req.body
    let registerQuery = ` SELECT * FROM registrations WHERE user_email = ?`
    let value = [email]
    connectionInfo.query(registerQuery,[value],(err,data,field)=>{
        if(err){
            console.log(err.message)
        }else{
            res.send(data)
        }
    })
}
export default getUserByEmail;
