import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginImg from '../../data/images/login.png'
import userIcon from '../../data/images/user.png'
import '../../styles/login.css'
import {AuthContext} from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config';

const Userlogin = () => {

  const {dispatch} = useContext(AuthContext);

  const[credentials,setcredentials] = useState({
    userName:undefined,
    password: undefined
});

  const navigate = useNavigate();

  const onSubmit =async (e) =>{
    try {
      e.preventDefault();
    const res=await fetch(`${BASE_URL}/auth/login`,{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(credentials)
    })
  
    const result =await res.json();
    if(!res.ok) {alert(result.message);
      dispatch({type:'LOGIN_FAILURE',payload:result.message})}
    else{
   //   console.log(result)
    dispatch({type:'LOGIN_SUCCESS',payload:result.data})
  
      navigate('/home');
    
    }
      
    } catch (err) {
      dispatch({type:'LOGIN_FAILURE',payload:err.message})
    }
    
  }

  const handleChange =(e)=>{
    setcredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    //alert(e.target.value )
}

  return (

    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-8 m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <form onsubmit={onSubmit}>
                  <div class="form-group">
                  <label>UserName</label>
                    <input type="text" class="form-control" placeholder="Email" required id="userName" onChange={handleChange}/>
                  </div>
                  <div class="form-group">
                  <label>Password</label>
                    <input type="password" class="form-control" placeholder="Password" required id="password" onChange={handleChange}/>
                  </div>
                  <button class="btn auth__btn" type="submit" onClick={onSubmit}>Login</button>
                </form>
                <p>Dont't have an account? <Link to="/register">Create</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Userlogin