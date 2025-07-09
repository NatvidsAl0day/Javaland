import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Button, Alert, Spinner } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './loginadmin.css';
import loginImg from '../../assets/images/adminLogs.jpg';
import userIcon from '../../assets/images/user.png';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import { BASE_URL } from '../../utils/config';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loading, error, dispatch } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: 'ADMIN_LOGIN_START' });
    try {
      const res = await axios.post(`${BASE_URL}/auth/loginAdmin`, credentials);
      console.log('Login response:', res.data);

      // adjust extraction based on your API
      const userObj    = res.data.data.user ?? res.data.data;
      const adminToken = res.data.data.token ?? res.data.token;
      if (!adminToken) throw new Error('Token tidak ditemukan di response');

      dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: { user: userObj, token: adminToken } });
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: msg });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex">
              <div className="login__img">
                <img src={loginImg} alt="Admin Login" />
              </div>
              <div className="login__form">
                {error && <Alert color="danger">{error}</Alert>}
                <div className="user-icon"><img src={userIcon} alt="User" /></div>
                <h2>Login Admin</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input id="email" type="email" placeholder="Email" required onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input id="password" type="password" placeholder="Password" required onChange={handleChange} />
                  </FormGroup>
                  <Button color="primary" block disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Login'}
                  </Button>
                </Form>
                <p className="mt-3">
                  Bukan admin? <Link to="/">Kembali</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
