import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './loginadmin.css'
import loginImg from '../../assets/images/adminLogs.jpg'
import userIcon from '../../assets/images/user.png'
import { AdminAuthContext } from '../../context/AdminAuthContext';
import { BASE_URL } from '../../utils/config';

//Perubahan Context Admin
const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const {dispatch} = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({type:'ADMIN_LOGIN_START'})

    try {
      const res = await fetch(`${BASE_URL}/auth/loginAdmin`, {
        method: 'post',
        headers: {
          "content-type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(credentials),
      })

      const result = await res.json()
      if (!res.ok) {
        alert(result.message);
        dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: result.message });
        navigate('/logAdmin');
        return;
      }

      console.log(result.data);
      dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: result.data });
      navigate('/admin');
    } catch (err) {
      dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: err.message });
      navigate('/logAdmin');
    }
    //   if (!res.ok) alert(result.message);
    //   console.log(result.data);

    //   dispatch({type:'LOGIN_SUCCESS', payload:result.data})
    //   navigate('/admin')

    // } catch(err) {
    //   dispatch({type:'LOGIN_FAILURE', payload:err.message})

    // }
  }

  // const handleClick = async e => {
  //   e.preventDefault();
  //   dispatch({type:'LOGIN_START'})
  
  //   try {
  //     const res = await fetch(`${BASE_URL}/auth/login`, {
  //       method: 'post',
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       credentials:'include',
  //       body: JSON.stringify(credentials),
  //     })
  
  //     const result = await res.json()
  //     if (!res.ok) alert(result.message);
      
  //     // Jika login berhasil, simpan token ke localStorage
  //     if (result.data.token) {
  //       localStorage.setItem('token', result.data.token);
  //     }
  
  //     dispatch({type:'LOGIN_SUCCESS', payload:result.data})
  //     navigate('/')
  
  //   } catch(err) {
  //     dispatch({type:'LOGIN_FAILURE', payload:err.message})
  //   }
  // }


  // useEffect(() => {
  //   const authToken = localStorage.getItem('token');
  //   if (authToken) {
  //     navigate('/');
    
  //   }
  // }, [navigate]);
  return (
  <section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
          <div className='login__container1 d-flex justify-content-between'>
            <div className='login__img1'>
              <img src={loginImg} alt=''/>
            </div>

            <div className="login__form1">
              <div className='user1'>
                <img src={userIcon} alt=''/>
              </div>
              <h2>Login Admin</h2>

              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type='email' placeholder='Email' required id='email' onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                  <input type='password' placeholder='Password' required id='password' onChange={handleChange} />
                </FormGroup>
                <Button className='btn1 secondary__btn auth__btn1' type='submit'>Login</Button>
              </Form>
              <p>Get Lost? <Link to='/'>Visitor</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default LoginAdmin;