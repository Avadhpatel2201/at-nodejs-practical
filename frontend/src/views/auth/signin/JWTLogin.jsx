import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JWTLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const res = await axios.post('http://localhost:8000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <input
          type='text'
          className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
          label="Email"
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
          type='password'
          className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
          label="Password"
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
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Row>
        <Col mt={2}>
          <Button className="btn-block mb-4" color="primary" size="large" type="submit" variant="primary">
            Signin
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default JWTLogin;
