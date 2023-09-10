import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { axiosInstance } from '../../Utility/axios.js'
import Button from 'react-bootstrap/Button';
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
function PassUpdate() {
    let userParams = useParams()

const [passWord, setpassWord] = useState({
    userPassword :"",
    confirmPassword:"",
    user_id :userParams.user_id
})
const [response, setresponse] = useState()
const [password, setPassword] = useState("");
const [icon1, setIcon1] = useState(eyeOff);
const [icon, setIcon] = useState(eyeOff);
const [type1, setType1] = useState("password");
const [type, setType] = useState("password");
let submitHandler = (e)=>{
    e.preventDefault()
    if(passWord.userPassword !== passWord.confirmPassword){
         return setresponse({
          messageToTheFront: "Passwords Doesn't Match",
          navigation: "/login",
          messageToUser: "Try again",
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
const handlePaste = (e) => {
  e.preventDefault();
  setPassword("");
};
  // //* to change the icon when clicked
  // const HandleIconChange = () => {
  //   //* event listen for Password function
  //   if (type === "password") {
  //     setIcon(eye);
  //     setType("text");
  //   } else {
  //     setIcon(eyeOff);
  //     setType("password");
  //   }
  // };
  // //* to change the icon when clicked
  // const HandleIconChangee = () => {
  //   //* event listen for Password function
  //   if (type1 === "password") {
  //     setIcon1(eye);
  //     setType1("text");
  //   } else {
  //     setIcon1(eyeOff);
  //     setType1("password");
  //   }
  // };
console.log(response)
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
        <div className='container mt-5'>
            <h1>Update Password</h1>
            <div className='passAkafi'>
            <form action="" onSubmit={submitHandler}>
           <input type={type} placeholder='New Password' name="newPassword" id="inputStyle1" onChange={handleChange}/>
           {/* <span className="showHide ">
                <Icon
                  icon={icon}
                  size={22}
                  onClick={HandleIconChange}
                  className="iconss"
                />
              </span> */}
           <input type="password" placeholder='Confirm Password' name="confirmPassword" onPaste={handlePaste} id="inputStyle2" onChange={handleChange} />
           {/* <span className="showHide ">
                <Icon
                  icon={icon1}
                  size={22}
                  onClick={HandleIconChangee}
                  className="iconss"
                />
              </span> */}
          <Button type='submit' variant='success'>update password</Button>
        </form>
            </div>
 
        </div>
      )
}

 
}

export default PassUpdate