import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  setCompanyName,
  setCompanyEmail,
  setCompanyPassword,
  setCompanyNumber,
} from '../../actions'
import LoginImage from '../../assets/Connectify.jpg'
import './style.css'
import { Spinner } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

const SignupBusiness = ({ handleSuccessfulRegistration }) => {
  const dispatch = useDispatch()
  const companyName = useSelector((state) => state.business.companyName)
  const companyNumber = useSelector((state) => state.business.companyNumber)
  const companyPassword = useSelector((state) => state.business.companyPassword)
  const companyEmail = useSelector((state) => state.business.companyEmail)
  const [showPassword, setShowPassword] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState('')

  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [data, setData] = useState('')

  useEffect(() => {
    postCompany()
  }, [data])

  async function getCompany(number) {
    try {
      const url = `http://127.0.0.1:5000/api/company/${number}`
      const res = await axios.get(url)
      const data = res.data
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function postCompany() {
    try {
      if (
        data['company_name'] == companyName &&
        data['company_number'] == companyNumber
      ) {
        const url = 'http://127.0.0.1:5000/businesses/register'
        const options = {
          business_name: companyName,
          business_number: companyNumber,
          business_email: companyEmail,
          business_password: companyPassword,
        }
        const res = await axios.post(url, options)
        const data = res.data

        if (res.status === 200) {
          setError(false)
          setIsLoaded(true)
          await axios.post('http://127.0.0.1:5000/verify-business-email', {
            business_email: companyEmail,
            token: data.token,
          })
          setShowSuccessMessage('Your account has successfully been created')
          setTimeout(() => {
            handleSuccessfulRegistration()
          }, 700)
        }
      } else {
        setErrorMessage('Problem Occured Please Try Again')
        setIsLoaded(false)
        setError(true)
      }
    } catch (error) {
      setError(true)
      setErrorMessage('Problem Occured Please Try Again')
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      companyName.length === 0 ||
      companyNumber.length === 0 ||
      companyPassword.length === 0 ||
      companyEmail.length === 0
    ) {
      setError(true)
      setIsLoaded(false)
      setErrorMessage('Please Enter Your Details')
    } else {
      await getCompany(companyNumber)
      setError(false)
      setIsLoaded(true)
    }
  }

  const handleInputName = (e) => {
    dispatch(setCompanyName(e.target.value.toUpperCase()))
  }

  const handleInputNumber = (e) => {
    dispatch(setCompanyNumber(e.target.value))
  }
  const handleInputPassword = (e) => {
    dispatch(setCompanyPassword(e.target.value))
  }
  const handleInputEmail = (e) => {
    dispatch(setCompanyEmail(e.target.value))
  }

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='container-login-register'>
      <form onSubmit={handleSubmit} className='business-container'>
        <label htmlFor='name' className='business-label'>
          Company name:
        </label>
        <input
          type='text'
          id='name'
          value={companyName}
          onChange={handleInputName}
          className='business-text'
        />

        <label htmlFor='number' className='business-label'>
          Company number:
        </label>
        <input
          type='number'
          id='number'
          value={companyNumber}
          onChange={handleInputNumber}
          className='business-text'
        />

        <label htmlFor='email' className='business-label'>
          Email address:
        </label>
        <input
          type='email'
          id='email'
          value={companyEmail}
          onChange={handleInputEmail}
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
            className='show-password-sign-up'
            icon={faEye}
            onClick={showPasswordHandler}
          />
        ) : (
          <FontAwesomeIcon
            className='show-password-sign-up'
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

export default SignupBusiness
