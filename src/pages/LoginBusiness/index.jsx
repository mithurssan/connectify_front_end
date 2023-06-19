import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { setToken, setCompanyName, setCompanyPassword } from '../../actions'
import LoginImage from '../../assets/Connectify.jpg'
import { Spinner } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import './style.css'

const LoginBusiness = () => {
  const dispatch = useDispatch()
  const companyName = useSelector((state) => state.business.companyName)
  const companyPassword = useSelector((state) => state.business.companyPassword)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const loginBusiness = async () => {
    try {
      const url = 'http://127.0.0.1:5000/businesses/login'
      const options = {
        business_name: companyName,
        business_password: companyPassword,
      }
      const res = await axios.post(url, options)

      dispatch(setToken(res.data.token))
    } catch (error) {
      console.log(error, 'error')
      if (error.response.status == 401) {
        setIsLoaded(false)
        setError(true)
        setErrorMessage('Details not recognised')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (companyName.length === 0 || companyPassword.length === 0) {
      setIsLoaded(false)
      setError(true)
      setErrorMessage('Please Enter Your Details')
    } else {
      loginBusiness()

      setIsLoaded(true)
      setError(false)
    }
  }

  const handleInputBusinessName = (e) => {
    dispatch(setCompanyName(e.target.value))
  }

  const handleInputPassword = (e) => {
    dispatch(setCompanyPassword(e.target.value))
  }

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev)
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
          value={companyName}
          onChange={handleInputBusinessName}
          className='business-text'
        />

        <label htmlFor='password' className='business-label'>
          Password:
        </label>

        <input
          type={!showPassword ? 'text' : 'password'}
          id='password'
          value={companyPassword}
          onChange={handleInputPassword}
          className='business-text'
        />
        {!showPassword ? (
          <FontAwesomeIcon
            className='show-password'
            icon={faEye}
            onClick={showPasswordHandler}
            data-testid='show-password-icon'
          />
        ) : (
          <FontAwesomeIcon
            className='show-password'
            icon={faEyeSlash}
            onClick={showPasswordHandler}
            data-testid='show-password-icon'
          />
        )}

        <input type='submit' value='Login' className='login-register-button' />
        <div className='container'>
          <Link to='/login-user' className='sign-in-user'>
            Login as a User
          </Link>
        </div>
        <div className='error-container'>
          <div className='error-message-container' data-testid='spinner'>
            {isLoaded && (
              <div className='spinner' data-testid='spinner'>
                <Spinner />
              </div>
            )}
          </div>
          <div
            className='error-message-container'
            data-testid='error-container'
          >
            {error && (
              <h1 className='not-recognised' data-testid='error-container'>
                {errorMessage}
              </h1>
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

export default LoginBusiness
