import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import {axiosInstance} from '../../Utility/axios'
import jwt_decode from "jwt-decode";

function Home() {
    const [userData,setUserData]= useContext(UserContext)
    const [fullInfo, setfullInfo] = useState([])
    const [Quesiotns, setQuesiotns] = useState([])
    const navigate = useNavigate()

    let token = localStorage.getItem('token');  
    let decodedToken =jwt_decode(token) 
    let user_id_Ftoken = decodedToken.id

   let getQuesitons = async ()=>{
    let token = localStorage.getItem('token');  

    if(token===null){
      localStorage.setItem('token','');
      token ='';
    }else{
      try {
        const userRes = await axiosInstance.get('admin/getUserProfile',{
          headers:{token:token}
        }).then(data=>{
          setfullInfo(data.data)
            let getQustions = async ()=>{
            let responseForQuestion = await axiosInstance.get('/user/getAllQuestions')
            setQuesiotns(responseForQuestion.data)
            }
            getQustions()
        })
      } catch (error) {
         console.log(error.message)
      }
    }  
   }
   useEffect(() => {
    getQuesitons()
  }, [])

   const logout = ()=>{
    setUserData({
      token : undefined
    })
    localStorage.setItem('token','')
    navigate('/login')
  }

  return (
    <div>
      <div>
      <h1>welcome {fullInfo[0]?.user_first_name}</h1>
        <button onClick={logout}>Log out</button>
      </div>
      <div>
         <a href='/question'>Ask Question</a>
      </div>
      <div>
         {
           Quesiotns?.map((quesitonInffo,i)=>{
            let questionsShow =(
              <div key={i} className='d-flex'>
                      <hr></hr>
                  <div className='col-md-3'>
                  question by : {quesitonInffo.user_first_name}
                 </div>
                 <div className='col-md-3'>
                  user email : {quesitonInffo.user_email}
                 </div>
                 <div className='col-md-3'>
                     question :  {quesitonInffo.questions}
                 </div>
                 <div className='col-md-3'>
                 question description :  {quesitonInffo.question_description}
                 </div>
                 <div>
             
                  <a href={`answer/${quesitonInffo.question_id}/${user_id_Ftoken}`}>
                  <button>Answer this question</button>
                  </a>
                 </div>
             <hr></hr>
             
              </div>
            )
            return questionsShow
           })
         }
      </div>
     
    </div>
  )
}

export default Home