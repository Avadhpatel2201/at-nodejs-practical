import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ current_password: "", new_password:"", confirm_new_password:"" });
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
      
    try {
      const res = await axios.post('http://localhost:8000/api/users/change_password', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message);
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess('');
    }
  };
  

  return (
    <React.Fragment>
      <Row>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
        <Col>
          <Card title="Change Password">
          <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="current_password" className="form-label">Current Password</label>
                    <input type="password" className="form-control" name="current_password" placeholder="Password" value={formData.current_password} onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="new_password" className="form-label">New Password</label>
                    <input type="password" className="form-control" name="new_password" placeholder="Password" value={formData.new_password} onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="confirm_new_password" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" name="confirm_new_password" placeholder="Confirm Password" value={formData.confirm_new_password} onChange={handleChange} required />
                  </div>
                  <button className="btn btn-primary mb-4">Sign up</button>
                  </form>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ChangePassword;
