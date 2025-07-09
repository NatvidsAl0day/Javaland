import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import './header.css';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {

    const [color, setColor] = useState(false)
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext)
    const logout = () => {
        dispatch({type:'LOGOUT'})
        navigate('/tours')
      }
    //   useEffect(() => {
    //     const changeColor = () => {
    //       if (window.scrollY >= 90) {
    //         setColor(true);
    //       } else {
    //         setColor(false);
    //       }
    //     };
      
    //     window.addEventListener('scroll', changeColor);
      
    //     // Cleanup
    //     return () => {
    //       window.removeEventListener('scroll', changeColor);
    //     };
    //   }, []);
    return (
        <div>
        <head>
        <meta charset="UTF8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="assets/img/favicon.png" type="image/x-icon" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css" rel="stylesheet"></link>
        
        {/* <link rel="stylesheet" href="assets/css/styles.css" /> */}
      </head>


    <header className={color ? 'header blur-header' : 'header'} id="header">
    <nav className="nav container">
      <a href="#" className="nav__logo">
        Java<span>land</span>
      </a>
      <div className="nav__menu" id="nav-menu">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="#home" className="nav__link active-link">
              Home
            </a>
          </li>
          {/* <li class="nav__item">
                      <a href="#about" class="nav__link">About</a>
                  </li> */}
          {/* <li class="nav__item">
                      <a href="#historical" class="nav__link">Historical</a>
                  </li> */}
          <li className="nav__item">
            <a href="#join_img" className="nav__link">
              JoinUS
            </a>
          </li>
          <li className="nav__item">
            <a href="/tours" target="_blank" className="nav__link">
              Tours
            </a>
          </li>
          {/* <li className="nav__item">
            <a
              href="/public/foodroutes/index.html"
              target="_blank"
              className="nav__link">
              Food
            </a>
          </li> */}
          <li className="nav__item">
            <div id="login-btn">
              {
                user?(<>
                <div className='auth_log'>
                  <h5 className='user_log'>{user.username}</h5>
                  <button className='btn-logout' onClick={logout}>Logout</button>
                </div>
                
                </>) : (<>
                <button className='btnlogin'>
                <Link to='/login' className='btnlog'>
                  Log In
                </Link>

              </button>
                
                
                </>)
              }


              {/* <button className='btnlogin'>
                <Link to='/login' className='btnlog'>
                  Log In
                </Link>

              </button> */}

            </div>
          </li>
          {/* <div id="login-btn">
                      <button class="btnlogin">Login</button>
                      <i class="far fa-user"></i>
                  </div> */}
        </ul>
        {/*Tombol Tutup*/}
        <div className="nav__close" id="nav-close">
          <i className="ri-close-line" />
        </div>
      </div>
      {/*Tombol Beralih*/}
      <div className="nav__toggle" id="nav-toggle">
        <i className="ri-menu-fill" />
      </div>
    </nav>
  </header>
        </div>
        
        
    )
}

export default Header;