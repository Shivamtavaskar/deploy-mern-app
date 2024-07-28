import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login">Profile</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
