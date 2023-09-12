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
 const [response, setresponse] = useState()
 const [qeustionList, setqeustionList] = useState([])
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
 let getUniqueAnsers =async ()=>{
    let url =`${axiosInstance.defaults.baseURL}/user/uniqueAns/${question_id}/${user_id}` 
     let responses = await axios.get(url)
     setqeustionList(responses.data)
   
 }

 useEffect(() => {
    getUniqueAnsers()
 }, [])
 
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
            <h2 className='title'>Previous responses for this question </h2>
             {
                qeustionList?.map((answers,i)=>{
                     let listOfAnsers = (
                              <div key={i} className='d-flex forBackgroundColor m-5'>
                                <div>

                                <div>{`Answer by : ${answers.user_name}`}</div>
                                <div>{`user email : ${answers.user_email}`}</div>
                                </div>
                                <div className='forAnswer'>
                                 <p>{`forwarded Answer : ${answers.answer}`}</p> 
                                </div>
                                <div>
                                   <Button>Update</Button>
                                </div>
                                <div>
                                    <a href="">Delete Answer</a>
                                </div>
                              </div>
                     )
                     return listOfAnsers
                })
             }
        </div>
    </>
  )
}


}

export default Answer