import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { axiosInstance } from '../../Utility/axios.js'
function PassUpdate() {
    let userParams = useParams()
const [passWord, setpassWord] = useState({
    userPassword :"",
    confirmPassword:"",
    user_id :useParams.user_id
})
const [response, setresponse] = useState()

let submitHandler = (e)=>{
    e.preventDefault()
    if(passWord.userPassword !== passWord.confirmPassword){
         return setresponse({
            successMessage: "Passwords Doesn't Match",
            redirect: "/login",
            message: "Try again",
         })
    }else{
        axios({
            method :'post',
            data : passWord,
            url:`${axiosInstance.defaults.baseURL}/user/updatePassword`
        }).then((data)=>{
            setresponse(data.data)
        })
    }
}
let handleChange =(e)=>{
     switch (e.target.name) {
        case 'newPassword':
             setpassWord((pre)=>{
               return {
                ...pre,
                userPassword : e.target.value
               }
             })
            break;
        case 'confirmPassword':
             setpassWord((pre)=>{
               return {
                ...pre,
                confirmPassword : e.target.value
               }
             })
            break;
     
        default:
            break;
     }
}


if(response){
      return (
        <div className="forSuccessPa">
        <h1 className="thankYou">{response.messageToTheFront}</h1>
        <a className="thankYouAnch" href={response.navigation}>
          {response.messageToUser}
        </a>
      </div>
      )
}else{
    return (
        <>
            <h1>update password</h1>
           <form action="" onSubmit={submitHandler}>
           <input type="text" placeholder='New Password' name="newPassword" id="" onChange={handleChange}/>
           <input type="text" placeholder='Confirm Password' name="confirmPassword" id="" onChange={handleChange} />
          <button>update password</button>
        </form>
        </>
      )
}

 
}

export default PassUpdate