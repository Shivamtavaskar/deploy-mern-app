import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { handleError, handleSuccess } from '../Utils';
import './signup.css'

const Signup = () => {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = inputData;

    if (!name || !email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/signup", inputData);
      const result = res.data; // Use res.data instead of res.json()
      const { success, message } = result;

      if (success) {
        handleSuccess("Signup Successful!");
        navigate('/login');
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.error;
        if (Array.isArray(errors)) {
          errors.forEach((err) => handleError(err.message));
        } else {
          handleError(error.response.data.message);
        }
      } else {
        handleError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            placeholder='Enter your name'
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
            placeholder='Enter your email'
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputData.password}
            onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
            placeholder='Enter your password'
          />
        </div>
        <button type='submit'>Signup</button>
        <span>Already have an account?</span>
        <Link to="/login">Login</Link>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
