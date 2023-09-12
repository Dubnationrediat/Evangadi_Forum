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
        messageToTheFront :'question added successfully',
        navigation : '/home',
        messageToUser:'click here for home page',
    })
 }
    })
}



let singleQuesion = (req,res)=>{
    const {user_id} = req.params
    let singleQ = `SELECT * FROM questions WHERE user_id = '${user_id}'`
    connectionInfo.query(singleQ,(err,data)=>{
      if(err){
         console.log(err.message)
      }else{
         res.json({
            data,
         })
      }
    })
}

let deleteQuestion  = (req,res)=>{
   const {question_id}=req.params
   let deleteQ = `DELETE FROM questions WHERE question_id='${question_id}'`
   connectionInfo.query(deleteQ,(err,data)=>{
      if(err){
         console.log(err.message)
      }else{
          res.json({
         messageToTheFront :'Question Deleted successfully',
        navigation : '/home',
        messageToUser:'Click Here For Home Page',
          })
      }
   })
}

export  {questionsC,singleQuesion,deleteQuestion}