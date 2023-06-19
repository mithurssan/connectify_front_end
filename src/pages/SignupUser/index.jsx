import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setUsername, setEmail, setPassword } from '../../actions'
import { Spinner } from '../../components'
import LoginImage from '../../assets/Connectify.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import './style.css'

const SignupUser = ({ handleSuccessfulRegistration }) => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const email = useSelector((state) => state.user.email)
  const password = useSelector((state) => state.user.password)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState('')

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

      if (data.error) {
        setError(true)
        setTimeout(() => {
          setIsLoaded(false)
        }, 100)
        setErrorMessage(data.error)
        setEmail('')
        setUsername('')
        setPassword('')
      } else {
        setError(false)
        setTimeout(() => {
          setIsLoaded(false)
        }, 100)

        await axios.post('http://127.0.0.1:5000/verify-email', {
          user_email: email,
          token: data.token,
        })
        setShowSuccessMessage('Your account has successfully been created')
        setTimeout(() => {
          handleSuccessfulRegistration()
        }, 700)
      }

      console.log(data)
    } catch (error) {
      setError(true)
      setIsLoaded(false)
      setErrorMessage('Error occured')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      setIsLoaded(false)
      setError(true)
      setErrorMessage('Please Enter Your Details')
    } else {
      registerUser()
      setError(false)
      setIsLoaded(true)
    }
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
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev)
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
          type={!showPassword ? 'text' : 'password'}
          id='password'
          value={password}
          onChange={handleInputPassword}
          className='business-text'
        />
        {!showPassword ? (
          <FontAwesomeIcon
            className='show-password-sign-up-user'
            icon={faEye}
            onClick={showPasswordHandler}
          />
        ) : (
          <FontAwesomeIcon
            className='show-password-sign-up-user'
            icon={faEyeSlash}
            onClick={showPasswordHandler}
          />
        )}

        <input
          type='submit'
          value='Register'
          className='login-register-button'
        />

        <div className='error-container'>
          <div className='error-message-container' data-testid='spinner'>
            {isLoaded && (
              <div className='spinner' data-testid='spinner'>
                <Spinner />
              </div>
            )}
          </div>

          <div className='error-message-container'>
            {error ? (
              <h1 className='not-recognised'>{errorMessage}</h1>
            ) : (
              <h1 className='success-messsage'>{showSuccessMessage}</h1>
            )}
          </div>
        </div>
      </form>

      <div className='login-register-image'>
        <img src={LoginImage} alt='login-page' className='image' />
      </div>
    </div>
  )
}

export default SignupUser
