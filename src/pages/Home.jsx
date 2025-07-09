import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';





const Home = () => {
  //header background
  const [color, setColor] = useState(false)
//   const changeColor = () => {
//     if (window.scrollY >= 90){
//       setColor(true);
//     } else{
//       setColor(false)
//   }
// }
//   window.addEventListener('scroll', changeColor)
  const navigate = useNavigate();
  const {user, dispatch} = useContext(AuthContext)

  const logout = () => {
    dispatch({type:'LOGOUT'})
    navigate('/')
  }
useEffect(() => {
  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  // Cleanup
  return () => {
    window.removeEventListener('scroll', changeColor);
  };
}, []); // Dependency array kosong menunjukkan bahwa efek hanya dijalankan sekali saat komponen dipasang.

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
        
        <link rel="stylesheet" href="assets/css/styles.css" />
        <title>Kens Travel</title>
      </head>
      <></><>
  {/* Header Section */}
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
  {/* <div className="login-form-container">
    <span className="fas fa-times" id="close-login-form" />
    <form action="">
      <h3>user login</h3>
      <input type="email" placeholder="Email" className="box" />
      <input type="password" placeholder="Password" className="box" />
      <p>
        Lupa Password? <a href="#">Click here</a>
      </p>
      <input type="submit" defaultValue="Log Now" className="btn btn-primary" />
      <p>or login with</p>
      <div className="buttons">
        <a href="#" className="btn">
          Google
        </a>
        <a href="#" className="btn">
          Facebook
        </a>
      </div>
      <p>
        Don't Have an Account?{" "}
        <a href="#join_img" id="close-join">
          Join Us
        </a>
      </p>
    </form>
  </div> */}
  {/*Main Section / Bagian Utama*/}
  <main className="main">
    {/*Home Section / Bagian Home*/}
    <section className="home section" id="home">
      <img src="assets/image/11.jpg" alt="home image" className="home__bg" />
      <div className="home__shadow" />
      <div className="home__container container grid">
        <div className="home__data">
          <h3 className="home__subtitle">Welcome To Java</h3>
          <h1 className="home__title">
            Explore <br />
            The World
          </h1>
          <p className="home__description">
            Jalani petualangan eksplorasi dunia, temukan surga-surga
            tersembunyi, jelajahi pulau-pulau, nikmati puncak-puncak gunung, dan
            masih banyak lagi! Dapatkan perjalanan impianmu sekarang.
          </p>
          <a href="#" className="button">
            Start Your Journey <i className="ri-arrow-right-line" />
          </a>
        </div>
        <div className="home__cards grid">
          <article className="home__card">
            <img
              src="assets/image/kwhijn1.png"
              alt="home image"
              className="home__card-img"
            />
            <h3 className="home__card-title">Kawah Ijen</h3>
            <div className="home__card-shadow" />
          </article>
          <article className="home__card">
            <img
              src="assets/image/srau.png"
              alt="home image"
              className="home__card-img"
            />
            <h3 className="home__card-title">Srau Beach</h3>
            <div className="home__card-shadow" />
          </article>
          <article className="home__card">
            <img
              src="assets/image/dedd.png"
              alt="home image"
              className="home__card-img"
            />
            <h3 className="home__card-title">De Djawatan</h3>
            <div className="home__card-shadow" />
          </article>
          <article className="home__card">
            <img
              src="assets/image/gmk.png"
              alt="home image"
              className="home__card-img"
            />
            <h3 className="home__card-title">Gumuk Pasir</h3>
            <div className="home__card-shadow" />
          </article>
        </div>
      </div>
    </section>
    {/*About Section / Bagian Tentang*/}
    <section className="about section" id="about">
      <div className="about__container container grid">
        <div className="about__data">
          <h2 className="section__title">
            Learn More <br />
            About Travel
          </h2>
          <p className="about__description">
            Javaland adalah sebuah situs web yang bertujuan untuk mengenalkan
            eksplorasi wisata di wilayah Jawa, Indonesia. Situs ini memiliki
            sejumlah fitur utama yang memberikan pengguna informasi tentang
            destinasi wisata, produk outdoor, dan rekomendasi makanan khas
            daerah Jawa.
          </p>
          <a href="#" className="button">
            Explore Travel <i className="ri-arrow-right-line" />
          </a>
        </div>
        <div className="about__image">
          <img
            src="assets/image/sarg.png"
            alt="about image"
            className="about__img"
          />
          <div className="about__shadow"></div>
        </div>
      </div>
    </section>
    {/*Popular Section / Bagian Popular*/}
    <section className="popular section" id="historical">
      <h2 className="section__title">
        Historical Building <br />
        The World of Java
      </h2>
      <div className="popular__container container grid">
        <article className="popular__card">
          <div className="popular__image">
            <img
              src="assets/image/ktlama.png"
              alt="popular image"
              className="popular__img"
            />
            <div className="popular__shadow" />
          </div>
          <h2 className="popular__title">Kota Lama</h2>
          <div className="popular__location">
            <i className="ri-map-pin-line" />
            <span>Semarang</span>
          </div>
        </article>
        <article className="popular__card">
          <div className="popular__image">
            <img
              src="assets/image/rtbk2.jpg"
              alt="popular image"
              className="popular__img"
            />
            <div className="popular__shadow" />
          </div>
          <h2 className="popular__title">Ratu Boko</h2>
          <div className="popular__location">
            <i className="ri-map-pin-line" />
            <span>Yogyakarta</span>
          </div>
        </article>
        <article className="popular__card">
          <div className="popular__image">
            <img
              src="assets/image/katdr1.jpg"
              alt="popular image"
              className="popular__img"
            />
            <div className="popular__shadow" />
          </div>
          <h2 className="popular__title">Gereja Katedral</h2>
          <div className="popular__location">
            <i className="ri-map-pin-line" />
            <span>Jakarta</span>
          </div>
        </article>
      </div>
    </section>
    {/*Explore Section / Bagian Explore*/}
    <section className="explore section" id="joinus">
      <div className="explore__container">
        <div className="explore__image">
          <img
            src="assets/image/brrev.png"
            alt="explore image"
            className="explore__img"
          />
          <div className="explore__shadow" />
        </div>
        <div className="explore__content container grid">
          <div className="explore__data">
            <h2 className="section__title">
              Explore The <br />
              Best Paradises
            </h2>
            <p className="explore__description">
              Jelajahi surga seperti pulau dan lembah saat berkeliling dunia
              adalah salah satu pengalaman terhebat saat Anda bepergian,
              menawarkan Anda keharmonisan dan kedamaian dan Anda dapat
              menikmatinya dengan sangat nyaman.
            </p>
          </div>
          <div className="explore__user">
            <img
              src="assets/image/12.jpg"
              alt="explore image"
              className="explore__perfill"
            />
            <span className="explore__name">Kens 0day</span>
          </div>
        </div>
      </div>
    </section>
    {/*Join Section / Bagian Join*/}
    <section className="join section" id="join">
      <div className="join__container container grid">
        <div className="join__data" id="join_us">
          <h2 className="section__title">
            Your Journey <br />
            Starts Here
          </h2>
          <p className="join__description">
            Get up to date with the latest travel and information from us.
          </p>
          <form action="" className="join__form">
            <input
              type="email"
              placeholder="Enter your Email"
              className="join__input"
            />
            <button className="join__button button">
              Join Us <i className="ri-arrow-right-line" />
            </button>
          </form>
        </div>
        <div className="join__image" id="join_img">
          <img
            src="assets/image/krmnjawa.png"
            alt="join image"
            className="join__img"
          />
          <div className="join__shadow" />
        </div>
      </div>
    </section>
  </main>
  {/*Footer Section / Bagian Footer*/}
  <footer className="footer">
    <div className="footer__container container grid">
      <div className="footer__content grid">
        <div>
          <a href="#" className="footer__logo">
            Javaland
          </a>
          <p className="footer__description">
            Travel with us and explore <br />
            the world without limits.
          </p>
        </div>
        <div className="footer__data grid">
          <div>
            <h3 className="footer__title">About</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  News &amp; Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Company</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  FASQs
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  History
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Contact</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  Call Center
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Contact US
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Support</h3>
            <ul className="footer__links">
              <li>
                <a href="#" className="footer__link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Terms &amp; Services
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Payments
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__group">
        <div className="footer__social">
          <a href="" target="_blank" className="footer__social-link">
            <i className="ri-facebook-line" />
          </a>
          <a href="" target="_blank" className="footer__social-link">
            <i className="ri-instagram-line" />
          </a>
          <a href="" target="_blank" className="footer__social-link">
            <i className="ri-twitter-line" />
          </a>
          <a href="" target="_blank" className="footer__social-link">
            <i className="ri-youtube-line" />
          </a>
        </div>
        <span className="footer__copy">
          © Copyright Kens 0day. All rights reserved
        </span>
      </div>
    </div>
  </footer>
  {/*Scroll UP*/}
  <a href="#" className="scrollup" id="scroll-up">
    <i className="ri-arrow-up-line" />
  </a>

  
  {/* <script src="assets/js/main.js" type='text/javascript'/> */}
  {/*ScrollReveal Javascript*/}
  {/*Javascript Import*/}
  {/* <Main/> */}
  
  
</>

    </div>
  );
}



export default Home;
