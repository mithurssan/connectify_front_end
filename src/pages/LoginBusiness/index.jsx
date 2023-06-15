import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoginImage from '../../assets/Connectify.jpg'

import './style.css'

const LoginBusiness = () => {
  const [businessName, setBusinessName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const loginBusiness = async () => {
    try {
      const url = 'http://127.0.0.1:5000/businesses/login'
      const options = {
        business_name: businessName,
        business_password: password,
      }
      await axios.post(url, options)
    } catch (error) {
      console.log(error, 'error')
      if (error.response.status == 401) {
        setIsLoaded(false)
        setError(true)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (businessName.length === 0) {
      setIsLoaded(false)
      setError(true)
    } else if (password.length === 0) {
      setIsLoaded(false)
      setError(true)
    } else {
      loginBusiness()

      setIsLoaded(true)
      setError(false)
    }
  }

  const handleInputBusinessName = (e) => {
    setBusinessName(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className='container-login-register'>
      <form onSubmit={handleSubmit} className='business-container'>
        <label htmlFor='username' className='business-label'>
          Business name:
        </label>
        <input
          type='text'
          id='username'
          value={businessName}
          onChange={handleInputBusinessName}
          className='business-text'
        />

        <label htmlFor='password' className='business-label'>
          Password:
        </label>

        <input
          id='password'
          value={password}
          onChange={handleInputPassword}
          className='business-text'
          type='password'
        />

        <input type='submit' value='Login' className='login-register-button' />
        <div className='container'>
          <Link to='/login-user' className='sign-in-user'>
            Login as a User
          </Link>
        </div>
      </form>

      {isLoaded && <h1>Correct Credentials</h1>}
      {error && (
        <div>
          <h1>Incorrect Credentials</h1>
        </div>
      )}

      <div className='login-register-image'>
        <img src={LoginImage} alt='login-page' className='image' />
      </div>
    </div>
  )
}

export default LoginBusiness
