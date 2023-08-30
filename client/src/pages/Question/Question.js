import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios';
import { axiosInstance } from '../../Utility/axios';
import jwt_decode from "jwt-decode";
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
  let handleSubmit =(e)=>{
    e.preventDefault()
  let  url = `${axiosInstance.defaults.baseURL}/user/questions`
    e.preventDefault()
    axios({
      method :'POST',
      url,
      data: question
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

  return (
    <div>
           <h3>Post Your Question</h3>
           <form onSubmit={handleSubmit} action="">
            <label htmlFor="questions">question</label>
            <input type="questions"  name="questions" id="questions" onChange={handleChange} />
            <label htmlFor="questionDescription">Question Details</label>
           <textarea name='question_description' onChange={handleChange}>

           </textarea>
           <button>Post Question</button>
           </form>
         
    </div>
  )
}

export default Question