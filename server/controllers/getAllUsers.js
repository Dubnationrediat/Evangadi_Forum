import connectionInfo from "../databaseConfig.js";

let getAllUsers = (req,res)=>{
let allUsersQuery = `SELECT user_id, user_name, user_email FROM registrations`
connectionInfo.query(allUsersQuery, (err, data) => {
    if(err){
        console.log(err.message)
    }else{
        res.send(data)
    }
});
}

export default getAllUsers