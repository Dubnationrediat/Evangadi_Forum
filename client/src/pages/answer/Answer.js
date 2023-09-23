import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import './Answer.css'
import { axiosInstance } from '../../Utility/axios';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import jwt_decode from "jwt-decode";
function Answer() {
 const {question_id,user_id} = useParams()
 const [answer, setAnswer] = useState({
      user_id,
      question_id,
      answer:''
 })
 const [PreviousAnswer, setPreviousAnswer] = useState([])
 const [response, setresponse] = useState()
 const [answersForQuestion, setAllQuestionAnswers] = useState([])
 let token = localStorage.getItem("token");
 let decodedToken = jwt_decode(token);
 let user_id_Ftoken = decodedToken.id;

 let submitAnswer =(e)=>{
    e.preventDefault()
    let url = `${axiosInstance.defaults.baseURL}/user/answer`
    axios({
        url,
        method:'POST',
        data : answer
    }).then((data)=>{
      setresponse(data.data)
    })
 }
 let handleChange = (e)=>{
   switch (e.target.name) {
    case "answers":
        setAnswer((pre)=>{
            return {
                ...pre,
                answer: e.target.value
            }
        })
        break;
    default:
        break;
   }
 }
 let getAllAnswers =async ()=>{
    let url =`${axiosInstance.defaults.baseURL}/user/allQuestions/${question_id}/${user_id}` 
     let responses = await axios.get(url)
     setAllQuestionAnswers(responses.data.data)
   
 }

 let getPreviousAnswer =async ()=>{
    let url =`${axiosInstance.defaults.baseURL}/user/uniqueAns/${question_id}/${user_id}` 
     let responses = await axios.get(url)
     setPreviousAnswer(responses.data)
 }

 useEffect(() => {
    getAllAnswers()
    getPreviousAnswer()
 }, [])

 function  toDelete(answer_id) {

  let deleteU =  `${axiosInstance.defaults.baseURL}/user/deleteAnswer/${answer_id}`;
  axios({
    method: "DELETE",
    url: deleteU,
  });
  setTimeout(()=>{
    getAllAnswers()
    getPreviousAnswer()
  },100)

}

if(response){
  return<div className="forSuccessPa">
  <h1 className="thankYou">{response.messageToTheFront}</h1>
  <a className="thankYouAnch" href={response.navigation}>
    {response.messageToUser}
  </a>
</div>
}else{
  return (
    <>
        <h3 className='title'>Post Answer</h3>
        <form onSubmit={submitAnswer}>
        <textarea name="answers" id="" maxLength='115' placeholder='your answer here' onChange={handleChange}></textarea>
        <div>

        <Button type='submit' variant='success'>Submit Answer</Button>
        </div>
        </form>
        <div className='mt-5 anserAkafi container' >
            <h2 className='title'>Previous Responses For This Question </h2>
             {
                answersForQuestion?.map((answerss,i)=>{
                  let time = answerss.time
                  let firstRefined = time.replace(/[-:.T]/g, '');
                  let finalRefined = firstRefined.slice(0,-4)
                  let yearStore= finalRefined.slice(0,4);
         
                  let dateStore =finalRefined.slice(6,8);
              
                  let monthStore=finalRefined.slice(4,6)
              
                  let timeStore = finalRefined.slice(8)
                     let listOfAnsers = (
                              <div key={i} className='d-flex forBackgroundColor m-5'>
                                <div>
                                <div>{`Answer by : ${answerss.user_name}`}</div>
                                <div>{`user email : ${answerss.user_email}`}</div>
                                <div>
                                Date : {`${dateStore}/${monthStore}/${yearStore}`}
                                </div>
                                </div>
                                <div className='forAnswer'>
                                 <p>{`forwarded Answer : ${answerss.answer}`}</p> 
                                </div>
                          
                              </div>
                     )
                     return listOfAnsers
                })
             }
        </div>
        <div>
          <hr />
          <h1>Previously Forwarded Answers By You</h1>
          <div>
          {
                PreviousAnswer?.map((answers,i)=>{
                     let listOfAnsers = (
                              <div key={i} className='d-flex forBackgroundColor m-5'>
                                <div>
                                </div>
                                <div className='forAnswer'>
                                 <p>{`forwarded Answer : ${answers.answer}`}</p> 
                                </div>
                                <div className='buttonAkafi'>
                                <div className='m-2'>
                                   <Button onClick={()=>toDelete(answers.answer_id)} variant='danger'>Delete</Button>
                                </div>
                                </div>
                              </div>
                     )
                     return listOfAnsers
                })
             }
          </div>



        </div>
    </>
  )
}


}

export default Answer