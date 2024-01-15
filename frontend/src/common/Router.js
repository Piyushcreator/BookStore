import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Userlogin from './auth/Userlogin'
import Usersignup from './auth/Usersignup'
import UserHome from './Books/UserHome'
import UserTransaction from './Transaction/UserTransaction'

const Router = () => {
    return (
      <Routes>
           <Route path="/" element={< Home />}/>
          <Route path="/login" element={<Userlogin/>}/>
          <Route path="/register" element={<Usersignup />}/>
          <Route path="/home" element={<UserHome />}/>
          <Route path="/transaction" element={<UserTransaction />}/>
      </Routes>
    )
  }
export default Router