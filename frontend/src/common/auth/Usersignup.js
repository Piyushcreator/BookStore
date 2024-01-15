import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import registerImg from '../../data/images/register.png'
import userIcon from '../../data/images/user.png'
import '../../styles/login.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';


const Usersignup = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  
  
  const[credentials,setcredentials] = useState({
    userName: undefined,
    name:undefined,
    email: undefined,
    password: undefined,
    contactNumber:undefined,
    role:'user'
  });
  
  const onSubmit = async (e) =>{
    try {
      const data=  JSON.stringify(credentials);
      e.preventDefault();
    const res=await fetch(`${BASE_URL}/auth/register`,{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(credentials)
    })
  
    const result =await res.json();
    if(!res.ok) alert(result.message);
    else{
    dispatch({type:'REGISTER_SUCCESS'})
    navigate('/login');}
      
    } catch (err) {
      alert(err.message)
    }
    
  }
  
  const handleChange =(e)=>{
    setcredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    //alert(e.target.value )
  };

  return (
    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-10 m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <form onsubmit={onSubmit}>
                  <div class="form-group">
                    <label>UserName</label>
                    <input type="text" class="form-control" placeholder="Username" required id="userName"  onChange={handleChange} />
                  </div>
                  <div class="form-group">
                  <label>Full Name</label>
                    <input type="text" class="form-control" placeholder="Full Name" required id="name"  onChange={handleChange}/>
                  </div>
                  <div class="form-group">
                  <label>Email</label>
                    <input type="text" class="form-control" placeholder="Email" required id="email"  onChange={handleChange}/>
                  </div>
                  <div class="form-group">
                  <label>Password</label>
                    <input type="password" class="form-control" placeholder="Password" required id="password" onChange={handleChange}/>
                  </div>
                  <div class="form-group">
                  <label>Contact Number</label>
                    <input type="number" class="form-control" placeholder="Contact Number" required id="contactNumber" onChange={handleChange} />
                  </div>
                  <div class="form-group mt-2 mb-2">
                    <label for="role" >Select Role:</label>
                    <select class="form-control" id="role" onChange={handleChange}>
                      <option value="user" selected>User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button class="btn auth__btn" type="submit" onClick={onSubmit}>Create Account</button>
                </form>
                <p>Already have an account. <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Usersignup;