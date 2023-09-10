import React, { useState } from 'react'
import './ForGotEmail.css'
import axios from 'axios'
import {axiosInstance}  from '../../Utility/axios.js'
import Button from 'react-bootstrap/Button';
function ForGotEmail() {
const [email, setEmail] = useState({
  emailFromFront : ""
})
const [response, setresponse] = useState()


  let submitHandler = (e)=>{
   let linkToSend = `${axiosInstance.defaults.baseURL}/admin/passUpdate`
    e.preventDefault()
    axios({
      method : 'POST',
      data : email,
      url : linkToSend
    }).then((responseFromBackEnd)=>{
      setresponse(responseFromBackEnd.data)
    })
  }
  
  let handelChange = (e)=>{
    e.preventDefault()
    switch (e.target.name) {
      case "forEmail":
           setEmail((pre)=>{
            return {
              ...pre,
              emailFromFront : e.target.value
            }
           })
        
        break;
    
      default:
        break;
    }
  }
  if(response){
    console.log(response)
    return(
      <div className="pageNotFound my-5">
              <h1 className="thankYou">{response.forThanking}</h1>
              <a className="thankYouAnch" href={`${response.route}`}>
                {response.forHomePageReturn}
              </a>
            </div> 
        )
  }else{
    return (
      <div className='container akaficontainerQ'>
         < form onSubmit={submitHandler}>
          <h3 className='titleRegister'>Please Pass Your Register Email</h3>
          <input type="text" placeholder='Your Email Here' name='forEmail' id='forgetEmail' onChange={handelChange}/>
          <Button type='submit'>Send Update Link</Button>
         </form>
      </div>
    )
  }
 
}

export default ForGotEmail