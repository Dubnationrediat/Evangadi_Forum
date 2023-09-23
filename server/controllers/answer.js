import connectionInfo from "../databaseConfig.js";
let answerC = (req,res)=>{
    const {question_id,user_id,answer} = req.body
    let insertQuestion = `INSERT INTO answers(user_id,user_name,user_email,question_id,answer)VALUES (?,?,?,?,?)`
    let userNameAndEmail = `SELECT user_first_name , user_email FROM registrations WHERE user_id=${user_id}`


   connectionInfo.query(userNameAndEmail,(err,data)=>{
      if(err){
         console.log(err.message)
      }else{
         let user_name = data[0].user_first_name
         let email = data[0].user_email
         let value = [user_id,user_name,email,question_id,answer]
          connectionInfo.query(insertQuestion,value,(err)=>{
            if(err){
               console.log(err.message)
            }else{
               res.send({
                   messageToTheFront :'Answer added',
                   navigation : '/home',
                   messageToUser:'click here for home page',
               })
            }
               })
      }
   })
}


let getAllAnswers = (req,res)=>{
   const {question_id,user_id}=req.params
    let selectAnswerWithProfile = `SELECT * FROM answers WHERE question_id=${question_id}`;
   connectionInfo.query(selectAnswerWithProfile,(err,data)=>{
       if(err){
         console.log(err)
       }else{
        res.json({data})
   
       }
   })
}


let singleAnswer = (req, res) => {
const {user_id,question_id } = req.params;
let selectAnswer = `SELECT * FROM answers WHERE question_id =${question_id} AND user_id=${user_id}`
   connectionInfo.query(selectAnswer, (err, data) => {
      if (err) {
         console.log(err);
      } else {
         res.send(data);
      }
   });
};


let deleteAnswerC = (req,res)=>{
   const {answer_id} = req.params
   let deleteAnswer = `DELETE  FROM answers WHERE answer_id = ${answer_id}`;
   connectionInfo.query(deleteAnswer, (err, data) => {
      if (err) {
         console.log(err.message);
      } else {
         res.send({
            messageToTheFront :'Answer Deleted',
            navigation : '/home',
            messageToUser:'click here for home page',
        })
 
      }
   });
}


export {answerC,getAllAnswers,singleAnswer,deleteAnswerC} 