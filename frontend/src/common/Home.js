import React, { useContext,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js';
import Userlogin from './auth/Userlogin.js';

const Home = () => {
const navigate = useNavigate();
const {user} = useContext(AuthContext);

useEffect(() => {
  if (!user) {
    navigate('/login');
  }
  else{
    navigate('/home');
  }
}, [user])
  return (
    <div className='text-center'>
      <Userlogin />
     
    </div>
  )
}

export default Home