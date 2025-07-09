import React, {useEffect, useRef, useState, useContext} from 'react';
import '../styles/tours-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from './Booking/Booking';
import Newslatter from '../shared/Newslatter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import Header from './Header/Header';
import { io } from 'socket.io-client';

const socket = io('/', {
  reconnection: true
})



const TourDetails = () => {

  const [color, setColor] = useState(false)
    const navigate = useNavigate();

    
    
    
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
      }, []);

  const {id} = useParams()
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const {user, dispatch} = useContext(AuthContext);
  const [commentsRealTime, setCommentsRealTime] = useState([]);
  const logout = () => {
    dispatch({type:'LOGOUT'})
    navigate('/')
  }


  //Fetch API
  const {data : tour, loading, error} = useFetch(`${BASE_URL}/tours/${id}`)
  const {photo, title, desc, price, reviews, address, city, distance, maxGroupSize} = tour;
  const {totalRating, avgRating} = calculateAvgRating(reviews);


  // Format tanggal
  const options = {day:'numeric', month:'long', year:'numeric'};


  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on('komentar-baru', (newComment) => {
      setCommentsRealTime(newComment)
    })
  }, [])


  // Kirim Komentar
  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {

      if (!user || user === undefined || user === null) {
        alert('please sign in')
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating
      }


      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'post',
        headers: {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials:'include',
        body: JSON.stringify(reviewObj)
      })

      //blom jadi sepenuhnya
      const result = await res.json()
      if(!res.ok) {
        socket.emit('review', reviews);
        return alert(result.message)
      }
      alert(result.message)
      


    } catch (err) {
      alert(err.message)

    }
  }

  let uiCommentUpdate = commentsRealTime.length > 0 ? commentsRealTime : reviews;

  useEffect(() => {
    window.scrollTo(0,0)
  },[tour])

  return (
    <>

    <div className='header_nav'>
      <Header/>
    </div>
  

  <section>
    
    <Container>
    
      {
        loading && <h4 className='text-center pt-5'>Loading.......</h4>
      }
      {
        error && <h4 className='text-center pt-5'>{error}</h4>
      }
      {
        !loading && !error && <Row>
        <Col lg='8'>
          <div className='tour__content'>
            <img src={photo} alt=''/>

            <div className='tour__info'>
              <h2>{title}</h2>

              <div className='d-flex align-items-center gap-5'>
              <span className='tour__rating d-flex align-items-center gap-1'>
                    <i class="ri-star-fill" style={{color: 'orange'}}></i> {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? ("Not Rated") : (<span>({reviews?.length})</span>)}
              </span>

                <span>
                  <i class='ri-map-pin-user-fill'></i> {address}
                </span>
              </div>
              <div className='tour__extra-details'>
                <span><i class="ri-map-pin-2-line"></i> {city} </span>
                <span><i class="ri-money-dollar-circle-line"></i>Rp {price} /Person </span>
                <span><i class="ri-map-pin-time-line"></i> {distance} K/m </span>
                <span><i class="ri-group-line"></i> {maxGroupSize} </span>
              </div>
              <h5>Description</h5>
              <p> {desc}<br></br> <br></br> Include : <br></br> - Akomodasi Bintang Lima <br></br>
                - Tur Budaya dan Sejarah <br></br>
                - Aktivitas Wisata Air <br></br>
                - Spa dan Kebugaran <br></br>
                - Kuliner Bali <br></br>
                - Transportasi Eksklusif </p>
            </div>

            {/* Tour Review */}
            <div className="tour__reviews mt-4">
              <h4>Reviews ({reviews?.length} ulasan)</h4>
              <Form onSubmit={submitHandler}>
                <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                  <span onClick={() => setTourRating(1)}> 1 <i class='ri-star-s-fill'></i></span>
                  <span onClick={() => setTourRating(2)}> 2 <i class='ri-star-s-fill'></i></span>
                  <span onClick={() => setTourRating(3)}> 3 <i class='ri-star-s-fill'></i></span>
                  <span onClick={() => setTourRating(4)}> 4 <i class='ri-star-s-fill'></i></span>
                  <span onClick={() => setTourRating(5)}> 5 <i class='ri-star-s-fill'></i></span>
                </div>

                <div className="reviews__input">
                  <input type='text' ref={reviewMsgRef} placeholder='Bagikan pengalamanmu...' required/>
                  <button className='btn__submit btn_prim text-white' type='submit'>
                    Submit
                  </button>
                </div>
              </Form>
              <ListGroup className='user__reviews'>
                {
                  uiCommentUpdate?.map(review => (
                    <div className='review__item'>
                      <img src={avatar} alt=''/>
                      <div className="w100">
                        <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <h5>{review.username}</h5>
                            <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                          </div>
                          <span className='star_rate'>
                            {review.rating}
                            <i class='ri-star-s-fill'></i>
                          </span>
                        </div>
                        <h6>{review.reviewText}</h6>
                      </div>
                    </div>
                  ))
                }
              </ListGroup>
            </div>
          </div>
        </Col>

        <Col lg='4'>
          <Booking tour={tour} avgRating = {avgRating}/>
        </Col>
      </Row>
      }
    </Container>
  </section>

  <Newslatter/>
  </>)

}


export default TourDetails;