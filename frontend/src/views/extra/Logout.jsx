import React, {useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
          await axios.post('http://localhost:8000/api/users/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.removeItem('token');
          navigate('/');
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        handleLogout();
    }, [])

  return (
    <div>
      
    </div>
  )
}

export default Logout
