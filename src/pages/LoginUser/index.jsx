import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { setToken, setUsername, setPassword } from '../../actions'
import LoginImage from '../../assets/Connectify.jpg'
import './style.css'
import { Spinner } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

const LoginUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          dispatch(setToken(storedToken))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchToken()
  }, [dispatch])

  const loginUser = async () => {
    try {
      const url = 'http://127.0.0.1:5000/users/login'
      const data = {
        user_username: username,
        user_password: password,
      }
      const res = await axios.post(url, data)

      console.log('Token dispatched:', res.data.token)
      console.log(dispatch(setToken(res.data.token)))
      navigate('/dashboard')
    } catch (error) {
      console.log(error, 'error')
      if (error.response && error.response.status === 401) {
        setIsLoaded(false)

        setError(true)
        setErrorMessage('Details not recognised')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username.length === 0 || password.length === 0) {
      setIsLoaded(false)
      setError(true)
      setErrorMessage('Please Enter Your Details')
    } else {
      setIsLoaded(true)
      setError(false)

      await loginUser()
    }
  }

  const handleInputUsername = (e) => {
    dispatch(setUsername(e.target.value))
  }

  const handleInputPassword = (e) => {
    dispatch(setPassword(e.target.value))
  }

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='container-login-register'>
      <form onSubmit={handleSubmit} className='user-container'>
        <label htmlFor='username' className='user-label'>
          Username:
        </label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleInputUsername}
          className='user-text'
        />

        <label htmlFor='password' className='user-label'>
          Password:
        </label>
        <input
          type={!showPassword ? 'text' : 'password'}
          id='password'
          value={password}
          onChange={handleInputPassword}
          className='user-text'
        />
        {!showPassword ? (
          <FontAwesomeIcon
            className='show-password-user'
            icon={faEye}
            onClick={showPasswordHandler}
          />
        ) : (
          <FontAwesomeIcon
            className='show-password-user'
            icon={faEyeSlash}
            onClick={showPasswordHandler}
          />
        )}
        <input type='submit' value='Login' className='login-register-button' />
        <div className='container'>
          <Link to='/login-register' className='sign-in-user '>
            Login as a Business
          </Link>
        </div>

        <div className='error-container'>
          <div className='error-message-container' data-testid='spinner'>
            {isLoaded && (
              <div className='spinner'>
                <Spinner />
              </div>
            )}
          </div>
          <div className='error-message-container'>
            {error && <h1 className='not-recognised'>{errorMessage}</h1>}
          </div>
        </div>
      </form>

      <div className='login-register-image'>
        <img src={LoginImage} alt='login-page' className='image' />
      </div>
    </div>
  )
}

export default LoginUser
