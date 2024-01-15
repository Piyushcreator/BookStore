import React,{useRef,useContext,useEffect} from 'react'
import { Link,NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../data/images/logo.png'

const Header = () => {

  const headRef= useRef(null);
  const menuRef= useRef(null);
  const navigate=useNavigate();
  const {user,dispatch} = useContext(AuthContext); 

  const logout=()=>{
    dispatch({type:'LOGOUT'});
    navigate('/');
  }

  const stickyHeaderFunc=()=>{
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headRef.current.classList.add('sticky__header');
      }
      else{
        headRef.current.classList.remove('sticky__header');
      }
    })
  }

  useEffect(()=>{
    stickyHeaderFunc();
    return window.removeEventListener('scroll',stickyHeaderFunc);
  });

  const toggleMenu=()=> menuRef.current.classList.toggle('show__menu')
  
  const nav_linksuser=[
      {
        path:'/home',
        display: 'Home'
      },
      {
        path:'/transaction',
        display: 'Transactions'
      }

  ]


  return (
    <header className="header" ref={headRef}>
    <div className='container'>
      <div className='row'> 
        <div className="nav__wrapper d-flex align-items-center justify-content-between">

        {/*Logo*/}
        <div className="logo">
          <img src={logo} alt=""/>
        </div>
        {/*Logo end*/}
        {/*Menu*/}
      
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu d-flex align-items-center gap-5">
            {user &&
              nav_linksuser.map((item,index)=>(
                <li className="nav__item" key={index}>
                  <NavLink to={item.path} className={navClass=>navClass.isActive?"active__link":""}>{item.display}</NavLink>
                </li>
              ))
            }
          </ul>
          </div>
          

            {/*Menu end*/}
         <div className="nav__right d-flex align-items-center gap-4">
          <div className="nav__btns d-flex align-items-center gap-4">
            {user?<>
            <h5 className='mb-0'>{user.username}</h5>
            <button className='btn btn-dark' onClick={logout}>Logout</button>
            </>:<>
            <button className="btn secondary__btn">
              <Link to="/login">Login</Link>
            </button>
            <button className="btn primary__btn">
              <Link to="/register">Register</Link>
            </button>
            </>}
           
          </div>
             <span className="mobile__menu" onClick={toggleMenu}><i class="bi bi-list"></i></span>
         </div>

         </div>
         </div>

      </div>
  </header>
  )
}

export default Header