import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { user, token, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Jika sudah ada token (dari localStorage atau Context), redirect ke home
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: JSON.parse(localStorage.getItem('user')), token: storedToken } });
      navigate('/');
    }
  }, [dispatch, navigate]);

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',           // biar cookie httpOnly dikirim
        body: JSON.stringify(credentials)
      });

      const result = await res.json();
      if (!res.ok) {
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        alert(result.message);
        return;
      }

      // Simpan token dan user ke localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data));
      }

      // Update Context
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: result.data, token: result.token }
      });

      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      console.error('Login error:', err);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={credentials.email}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={credentials.password}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  {error && <p className="text-danger mt-2">{error}</p>}
                </Form>

                <p className="mt-3">
                  Don&apos;t have an account? <Link to="/register">Join Us</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
