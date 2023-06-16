import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  setCompanyName,
  setCompanyEmail,
  setCompanyPassword,
  setCompanyNumber,
  setIsLoaded,
  setError,
} from '../../actions'
import LoginImage from '../../assets/Connectify.jpg'
import './style.css'

const SignupBusiness = () => {
  const dispatch = useDispatch()
  const companyName = useSelector((state) => state.business.companyName)
  const companyNumber = useSelector((state) => state.business.companyNumber)
  const companyPassword = useSelector((state) => state.business.companyPassword)
  const companyEmail = useSelector((state) => state.business.companyEmail)
  const isLoaded = useSelector((state) => state.app.isLoaded)
  const error = useSelector((state) => state.app.error)

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
          dispatch(setIsLoaded(true))
          dispatch(setError(false))
          await axios.post('http://127.0.0.1:5000/verify-business-email', {
            business_email: companyEmail,
            token: data.token,
          })
        }
      } else {
        dispatch(setIsLoaded(false))
      }
    } catch (error) {
      dispatch(setError(true))
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await getCompany(companyNumber)
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
          type='password'
          id='password'
          value={companyPassword}
          onChange={handleInputPassword}
          className='business-text'
        />

        <input
          type='submit'
          value='Register'
          className='login-register-button'
        />
      </form>

      {isLoaded && console.log('Correct Credentials')}
      {error && console.log('Incorrect Credentials')}
      <div className='login-register-image'>
        <img src={LoginImage} alt='login-page' className='image' />
      </div>
    </div>
  )
}

export default SignupBusiness
