import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

function Question() {
    const [userData,setUserData]= useContext(UserContext)
 
  return (
    <div>
           <h3>Post Your Question</h3>
           <form action="">
            
           </form>
           <textarea></textarea>
    </div>
  )
}

export default Question