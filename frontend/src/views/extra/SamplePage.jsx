import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

const SamplePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      } else {
        try {
          const res = await axios.get('http://localhost:8000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(res.data);
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Dashboard">
            <p>Username: {user.username} </p>
            <p>Email: {user.email}</p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
