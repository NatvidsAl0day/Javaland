import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Spinner, Alert } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './loginadmin.css';
import loginImg from '../../assets/images/adminLogs.jpg';
import userIcon from '../../assets/images/user.png';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import { BASE_URL } from '../../utils/config';
import axios from 'axios';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { admin, token, loading, error, dispatch } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  dispatch({ type: 'ADMIN_LOGIN_START' });

  try {
    const res = await axios.post(`${BASE_URL}/auth/loginAdmin`, credentials, { withCredentials: true });
    console.log('Login response:', res.data);

    const adminToken = res.data.accessToken
      || res.data.token
      || res.data.data?.token
      || res.data.data?.accessToken;

    if (!adminToken) {
      throw new Error('Token tidak ditemukan di response');
    }

    dispatch({
      type: 'ADMIN_LOGIN_SUCCESS',
      payload: { user: res.data.data?.user || res.data.data, token: adminToken }
    });

    navigate('/admin');
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: msg });
    alert('Login gagal: ' + msg);
  }
};

  return (
    <section className="login-section">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container1 d-flex">
              <div className="login__img1">
                <img src={loginImg} alt="Admin Login" />
              </div>

              <div className="login__form1">
                <div className="user1">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login Admin</h2>

                {/* Tampilkan error jika ada */}
                {error && <Alert color="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
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
                    className="btn1 secondary__btn auth__btn1"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Login'}
                  </Button>
                </Form>

                <p className="mt-3">
                  Bukan admin? <Link to="/">Kembali ke Visitor</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginAdmin;
