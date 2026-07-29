import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const VerifyEmail = () => {
  const {token} = useParams();

  useEffect(() => {
    async function getData() {
       try {
         let data = await axios.post(`http://localhost:5000/api/v1/auth/verifyemail/${token}`)
        
       } catch (error) {
        console.log(error);        
       }  
    }
    getData();
  }, []);

  console.log(token);
  

  return (
    <div className='py-50 px-30'>VerifyEmail
           <h2>email verification processing..........</h2>
          <a href="/login" className='font-bold border-b-2 border-red-400'>Login now</a>
    </div>
  )
}

export default VerifyEmail