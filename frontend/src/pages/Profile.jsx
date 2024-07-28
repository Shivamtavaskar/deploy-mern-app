import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';
import "./profile.css"

const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]); // Initialize as an array
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleError('User not authenticated');
        navigate('/login');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const res = await axios.get('https://deploy-mern-app-three.vercel.app/products', { headers });
      const result = res.data;
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError('Failed to fetch data', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name}: ${product.price}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
