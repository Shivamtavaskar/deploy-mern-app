import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { handleError, handleSuccess } from '../Utils';
import "./login.css"

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {  email, password } = inputData;

    if ( !email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/login", inputData);
      const result = res.data; // Use res.data instead of res.json()
      const { success, message, name, jwtToken } = result;

      if (success) {
        handleSuccess("Login Successful!");
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("loggedInUser",name)
        navigate('/profile');
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
        <button type='submit'>Login</button>
        <label>Don not Have account ?</label>
        <Link to ="/signup">Signup</Link>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
