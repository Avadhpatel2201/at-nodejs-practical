import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const SignUp1 = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/users/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <i className="feather icon-user-plus auth-icon" />
                    </div>
                    <h3 className="mb-4">Sign up</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className={`form-control ${validationErrors.username ? 'is-invalid' : ''}`}
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                      {validationErrors.username && (
                        <div className="invalid-feedback">
                          {validationErrors.username}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {validationErrors.email && (
                        <div className="invalid-feedback">
                          {validationErrors.email}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {validationErrors.password && (
                        <div className="invalid-feedback">
                          {validationErrors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <input
                        type="password"
                        className={`form-control ${validationErrors.confirmPassword ? 'is-invalid' : ''}`}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      {validationErrors.confirmPassword && (
                        <div className="invalid-feedback">
                          {validationErrors.confirmPassword}
                        </div>
                      )}
                    </div>
                    <button className="btn btn-primary mb-4">Sign up</button>
                  </form>
                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to={'/login'} className="f-w-400">
                      Login
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
