import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import './Answer.css'
import { axiosInstance } from '../../Utility/axios';
import axios from 'axios';
import jwt_decode from "jwt-decode";
function Answer() {

    // let token = localStorage.getItem('token');  
    // let decodedToken =jwt_decode(token) 
    // let user_id_answered = decodedToken.id

 const {question_id,user_id} = useParams()
 const [answer, setAnswer] = useState({
      user_id,
      question_id,
      answer:''
 })

 const [qeustionList, setqeustionList] = useState([])
 let submitAnswer =(e)=>{
    e.preventDefault()
    let url = `${axiosInstance.defaults.baseURL}/user/answer`
    axios({
        url,
        method:'POST',
        data : answer
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
 let getUniqueAnsers =async ()=>{
    let url =`${axiosInstance.defaults.baseURL}/user/uniqueAns/${question_id}/${user_id}` 
     let responses = await axios.get(url)
     setqeustionList(responses.data)
   
 }

 useEffect(() => {
    getUniqueAnsers()
 }, [])
 
 console.log(qeustionList)

  return (
    <>
        <div>Post Answer</div>
        <form onSubmit={submitAnswer}>
        <textarea name="answers" id="" maxLength='115' placeholder='your answer here' onChange={handleChange}></textarea>
        <button>Submit Answer</button>
        </form>
        <div>
            <h2>Previous responses for this question </h2>
             {
                qeustionList?.map((answers,i)=>{
                     let listOfAnsers = (
                              <div key={i}>
                                    <hr/>
                                <div>{`Answer by : ${answers.user_name}`}</div>
                                <div>{`user email : ${answers.user_email}`}</div>
                                 <p>{`forwarded Answer : ${answers.answer}`}</p> 
                                 <hr/>
                              </div>
                     )
                     return listOfAnsers
                })
             }
        </div>
    </>
  )
}

export default Answer