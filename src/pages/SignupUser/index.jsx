import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  setUsername,
  setEmail,
  setPassword,
  setIsLoaded,
  setError,
} from '../../actions'
import LoginImage from '../../assets/Connectify.jpg'
import './style.css'

const SignupUser = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const email = useSelector((state) => state.user.email)
  const password = useSelector((state) => state.user.password)
  const isLoaded = useSelector((state) => state.app.isLoaded)
  const error = useSelector((state) => state.app.error)

  async function registerUser() {
    try {
      const url = 'http://127.0.0.1:5000/users/register'
      const options = {
        user_username: username,
        user_email: email,
        user_password: password,
      }
      const res = await axios.post(url, options)

      const data = res.data

      if (res.status === 200) {
        dispatch(setIsLoaded(true))
        dispatch(setError(false))
        await axios.post('http://127.0.0.1:5000/verify-email', {
          user_email: email,
          token: data.token,
        })
      } else {
        dispatch(setIsLoaded(false))
        dispatch(setError(true))
      }

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    registerUser()
  }

  const handleInputUsername = (e) => {
    dispatch(setUsername(e.target.value))
  }

  const handleInputEmail = (e) => {
    dispatch(setEmail(e.target.value))
  }
  const handleInputPassword = (e) => {
    dispatch(setPassword(e.target.value))
  }

  return (
    <div className='container-login-register'>
      <form onSubmit={handleSubmit} className='business-container'>
        <label htmlFor='username' className='business-label'>
          Username:{' '}
        </label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleInputUsername}
          className='business-text'
        />

        <label htmlFor='email' className='business-label'>
          Email:{' '}
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleInputEmail}
          className='business-text'
        />

        <label htmlFor='password' className='business-label'>
          Password:{' '}
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handleInputPassword}
          className='business-text'
        />

<<<<<<< HEAD
				<input type="submit" value="Register" className="login-register-button" />

			
		
    
=======
        <input
          type='submit'
          value='Register'
          className='login-register-button'
        />

        <div className='container'>
          <Link to='/login-register' className='sign-up-business'>
            Sign Up as a Business
          </Link>
        </div>
>>>>>>> 26ebd3d2bad74e1cff9e2ab3eca50fef02cc8d6e
      </form>

      {isLoaded && console.log('Correct Credentials')}
      {error && console.log('Incorrect Credentials')}
      <div className='login-register-image'>
        <img src={LoginImage} alt='login-page' className='image' />
      </div>
    </div>
  )
}

export default SignupUser
