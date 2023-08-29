import connectionInfo from "../databaseConfig.js";

let userProfile = (req,res)=>{

    const id = req.id
    const user_name = req.display_name
    let registerQuery = ` SELECT registrations.user_id, registrations.user_name, registrations.user_email,registrations.user_first_name,registrations.user_last_name FROM registrations LEFT JOIN profiles ON registrations.user_id = profiles.user_id WHERE registrations.user_id = ?`
   
    let value = [id]
    connectionInfo.query(registerQuery,[value],(err,data,field)=>{
        if(err){
            console.log(err.message)
        }else{
            res.send(data)
        }
    })
}
export default userProfile;
