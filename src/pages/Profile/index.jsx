import { useState, useEffect } from 'react'
import { Spinner } from '../../components'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const Profile = () => {
  const [updateUserProfile, setUpdateUserProfile] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userPassword: '',
    loaded: false,
    message: '',
  })

  const { userName, userEmail, userPassword, message, loaded } =
    updateUserProfile

  const userNameHandler = (e) => {
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userName: e.target.value,
    }))
  }

  const userEmailHandler = (e) => {
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userEmail: e.target.value,
    }))
  }

  const userPasswordHandler = (e) => {
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userPassword: e.target.value,
    }))
  }

  const updateProfile = async (id) => {
    if (userName && userEmail && userPassword) {
      try {
        const data = {
          user_username: userName,
          user_email: userEmail,
          user_password: userPassword,
        }
        console.log(data)

        const response = await axios.patch(
          `http://127.0.0.1:5000/users/update/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log('hello', response.data)

        if (response.status === 201 || response.status === 200) {
          setUpdateUserProfile((prevState) => ({
            ...prevState,
            message: 'User profile updated successfully',
            loaded: true,
          }))
        } else {
          throw new Error('There was a problem in updating your profile.')
        }
      } catch (error) {
        setUpdateUserProfile((prevState) => ({
          ...prevState,
          message: error.message,
        }))

        setTimeout(() => {
          setUpdateUserProfile((prevState) => ({
            ...prevState,
            loaded: false,
          }))
        }, 500)
      }
    } else {
      setUpdateUserProfile((prevState) => ({
        ...prevState,
        message: 'Please enter your profile',
      }))

      setTimeout(() => {
        setUpdateUserProfile((prevState) => ({
          ...prevState,
          loaded: false,
          message: '',
        }))
      }, 5000)
    }
  }

  const clearInputHandler = () => {
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userEmail: '',
    }))
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userName: '',
    }))
    setUpdateUserProfile((prevState) => ({
      ...prevState,
      userPassword: '',
    }))
  }

  const updateProfileSubmitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    updateProfile(decodedToken.user_id)
    clearInputHandler()
  }

  return (
    <>
      <form
        onSubmit={updateProfileSubmitHandler}
        className='add-journal-container'
      >
        <div className='date-add-journal-container'>
          <label className='date-label'>UserName</label>
          <input
            className='date-input'
            onChange={userNameHandler}
            type='text'
            value={userName}
          />
        </div>
        <div className='date-add-journal-container'>
          <label className='title-label'>Email</label>
          <input
            className='add-journal-text'
            onChange={userEmailHandler}
            type='text'
            value={userEmail}
          />
        </div>
        <div className='date-add-journal-container'>
          <label className='content-label'>Password</label>

          <input
            onChange={userPasswordHandler}
            type='password'
            value={userPassword}
          />
        </div>
        <div className='add-journal-button-container'>
          <button className='add-journal-button' type='submit'>
            Save
          </button>
        </div>

        {loaded && (
          <div className='spinner-journal'>
            <Spinner />
          </div>
        )}
        <p className='error-messages'>{message}</p>
      </form>
    </>
  )
}

export default Profile
