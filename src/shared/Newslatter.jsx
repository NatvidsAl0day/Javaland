// import React from 'react'
// import './newslatter.css'
// import { Container, Col, Row } from 'reactstrap'
// import maletourist from '../assets/images/male-tourist.png'

// const Newslatter = () => {
//     return (<section className='newslatter'>
//         <Container>
//             <Row>
//                 <Col lg='6'>
//                     <div className='newslatter__content'>
//                         <h2>Subscribe to our newsletter</h2>
//                         <div className='newslatter__input'>
//                             <input type='email' placeholder='Enter your email'/>
//                             <button className='btn newslatter__btn'>
//                                 Subscribe
//                             </button>
//                         </div>
//                         <p>
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                         </p>

//                     </div>

//                 </Col>
//                 <Col lg='6'>
//                     <div className='newslatter__img'>
//                         <img src={maletourist} alt=''/>
//                     </div>

//                 </Col>
//             </Row>
//         </Container>
//     </section>
//     )
// }

// export default Newslatter

import React, { useState } from 'react';
import './newslatter.css'
import emailjs from 'emailjs-com';
import { Container, Col, Row } from 'reactstrap';
import maletourist from '../assets/images/male-tourist.png';

const Newslatter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Kirim email menggunakan Email.js
    emailjs.send('service_le64k8b', 'template_f8mce8g', { to_email: email, to_name: 'Customer ' + email, from_name: 'JAVALAND', message: 'Thanks For Susbrcibe ' }, 'hvsS8Aaw76szDBB10')
      .then((response) => {
        console.log('Email terkirim:', response);
        alert("Email Berhasil dikirim")

      })
      .catch((error) => {
        console.error('Gagal mengirim email:', error);
        alert("Email Gagal Dikirim")
        
      });
  };

  return (
    <section className='newslatter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className='newslatter__content'>
              <h2>Subscribe to our newsletter</h2>
              <form onSubmit={handleSubscribe}>
                <div className='newslatter__input'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type='submit' className='btn newslatter__btn'>
                    Subscribe
                  </button>
                </div>
              </form>
              <p>
              Jangan biarkan momen berharga lewat begitu saja! Segera rencanakan liburan Anda dan temukan keindahan Jawa. Nikmati momen tak terlupakan, penuh petualangan, dan kenangan yang akan menghiasi hidup Anda. Jadikan setiap langkah sebagai petualangan baru dan mari kita eksplorasi bersama! Yuk, jangan ragu untuk merencanakan perjalanan luar biasa Anda sekarang!
              </p>
            </div>
          </Col>
          <Col lg='6'>
            <div className='newslatter__img'>
              <img src={maletourist} alt='' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newslatter;