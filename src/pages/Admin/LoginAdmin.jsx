import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './loginadmin.css';
import loginImg from '../../assets/images/adminLogs.jpg';
import userIcon from '../../assets/images/user.png';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import { BASE_URL } from '../../utils/config';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { admin, token_admin, dispatch } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const [showToken, setShowToken] = useState(false);

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: 'ADMIN_LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/loginAdmin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: result.message });
        alert(result.message);
        return;
      }

      // Ambil token dari response
      const adminToken = result.token;
      // Simpan ke localStorage
      localStorage.setItem('token_admin', adminToken);
      // Update context: simpan admin data dan token
      dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: { admin: result.data, token: adminToken }
      });

      // Tampilkan token di UI
      setShowToken(true);

      // Redirect setelah beberapa detik (misal 1 detik)
      setTimeout(() => {
        navigate('/admin');
      }, 1000);

    } catch (err) {
      dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: err.message });
      alert('Login gagal: ' + err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container1 d-flex justify-content-between">
              <div className="login__img1">
                <img src={loginImg} alt="Admin Login" />
              </div>

              <div className="login__form1">
                <div className="user1">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login Admin</h2>

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

                  <Button className="btn1 secondary__btn auth__btn1" type="submit">
                    Login
                  </Button>
                </Form>

                {showToken && (
                  <div className="mt-3 p-2 border rounded">
                    <strong>Token Admin:</strong>
                    <p style={{ wordBreak: 'break-all' }}>{localStorage.getItem('token_admin')}</p>
                  </div>
                )}

                <p className="mt-3">
                  Get Lost? <Link to="/">Visitor</Link>
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
