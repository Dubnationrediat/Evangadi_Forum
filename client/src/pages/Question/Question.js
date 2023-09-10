import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { axiosInstance } from '../../Utility/axios';
import jwt_decode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import './Question.css'
function Question() {
    const [userData,setUserData]= useContext(UserContext);
  let token = localStorage.getItem('token');  
    let decodedToken =jwt_decode(token) 
    let user_id_Ftoken = decodedToken.id
 const [question, setQuestion] = useState({
    questions: '',
    user_id: user_id_Ftoken,
    question_description :''
 })
 const [response, setresponse] = useState()
  let handleSubmit =(e)=>{
    e.preventDefault()
  let  url = `${axiosInstance.defaults.baseURL}/user/questions`
    e.preventDefault()
    axios({
      method :'POST',
      url,
      data: question
    }).then((data)=>{
      setresponse(data.data)
    })
  }

    let handleChange = (e)=>{
       switch (e.target.name) {
        case 'questions': setQuestion((pre)=>{
          return {
            ...pre,
             questions : e.target.value
          }
        })
          break;
        case 'question_description': setQuestion((pre)=>{
          return {
            ...pre,
            question_description : e.target.value
          }
        })
          break;
        default:
          break;
       }
    }

 if(response){
  return<div className="forSuccessPa">
  <h1 className="thankYou">{response.messageToTheFront}</h1>
  <a className="thankYouAnch" href={response.navigation}>
    {response.messageToUser}
  </a>
</div>
 }
  return (
    <div className='container mt-5 questionAkafi'>
           <h3 className='title'>Post Your Question</h3>
           <form onSubmit={handleSubmit} action="">
           
            <input type="questions" placeholder='Question Title'  name="questions" id="questions" onChange={handleChange} />
           <textarea maxLength='250' placeholder='Question detail' name='question_description' onChange={handleChange}>
           </textarea>
           <div>

           <Button type='submit' variant='success'>Post Question</Button>
           </div>
           </form>   
    </div>
  )
}

export default Question