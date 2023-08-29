import connectionInfo from "../databaseConfig.js";
let answerC = (req,res)=>{
    const {question_id,user_id,answer} = req.body
    let insertQuestion = `INSERT INTO answers(user_id,answer,question_id)VALUES (?,?,?)`
    let value = [user_id,answer,question_id]
    connectionInfo.query(insertQuestion,value,(err)=>{
 if(err){
    console.log(err.message)
 }else{
    res.send({
        messageToTheFront :'answer added',
        navigation : '/home',
        messageToUser:'click here for home page',
    })
 }
    })
}


let getUniqueAnsers = (req,res)=>{
   const {question_id,user_id}=req.params
   // let selectAnswers = `SELECT * FROM answers WHERE question_id = ${question_id}`
   // let userInfo = `SELECT * FROM registrations WHERE user_id=${user_id} `

   let selectAnswers = `SELECT * FROM answers JOIN registrations ON answers.user_id = registrations.user_id `

   connectionInfo.query(selectAnswers,(err,data)=>{
       if(err){
         console.log(err)
       }else{
          res.send(data)
   
       }
   })
}

export {answerC,getUniqueAnsers} 