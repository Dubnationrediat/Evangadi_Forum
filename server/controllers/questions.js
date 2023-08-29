import connectionInfo from "../databaseConfig.js";
let questionsC = (req,res)=>{
    const {user_id,questions,question_description} = req.body
    let insertQuestion = `INSERT INTO questions(user_id,questions,question_description)VALUES (?,?,?)`
    let value = [user_id,questions,question_description]
    connectionInfo.query(insertQuestion,value,(err)=>{
 if(err){
    console.log(err.message)
 }else{
    res.send({
        messageToTheFront :'question added',
        navigation : '/home',
        messageToUser:'click here for home page',
    })
 }
    })
}

export default questionsC