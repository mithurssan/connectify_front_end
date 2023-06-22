import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components'
import jwtDecode from 'jwt-decode'
import Journal from '../../assets/journal.png'
import './style.css'

const EditJournal = () => {
  const [editJournal, setEditJournal] = useState({
    userId: '',
    date: '',
    title: '',
    content: '',
    message: '',
    loaded: false,
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const { userId, date, title, content, message, loaded } = editJournal

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setEditJournal((prevState) => ({
          ...prevState,
          userId: decodedToken.user_id,
        }))
      } catch (error) {
        console.log('Error decoding token:', error)
      }
    }
  }, [])

  const editEntry = async () => {
    if (date && title && content) {
      try {
        const data = {
          user_id: userId,
          entry_date: date,
          entry_title: title,
          entry_content: content,
        }
        console.log(data)

        const response = await axios.put(
          `https://connectify-server-b31a.onrender.com/entries/update/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(response.data)

        if (response.status === 201 || response.status === 200) {
          setEditJournal((prevState) => ({
            ...prevState,
            message: 'Entry updated successfully',
            loaded: true,
          }))

          setTimeout(() => {
            navigate('/wellbeing/get-journal')
          }, 500)
        } else {
          throw new Error('There was a problem creating your entry.')
        }
      } catch (error) {
        setEditJournal((prevState) => ({
          ...prevState,
          message: error.message,
        }))

        setTimeout(() => {
          setEditJournal((prevState) => ({
            ...prevState,
            loaded: false,
          }))
        }, 500)
      }
    } else {
      setEditJournal((prevState) => ({
        ...prevState,
        message: 'Please enter your entry',
      }))

      setTimeout(() => {
        setEditJournal((prevState) => ({
          ...prevState,
          loaded: false,
          message: '',
        }))
      }, 5000)
    }
  }
  const dateHandler = (e) => {
    setEditJournal((prevState) => ({
      ...prevState,
      date: e.target.value,
    }))
  }

  const titleHandler = (e) => {
    setEditJournal((prevState) => ({
      ...prevState,
      title: e.target.value,
    }))
  }

  const contentHandler = (e) => {
    setEditJournal((prevState) => ({
      ...prevState,
      content: e.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    editEntry()
  }

  const goBack = () => {
    navigate('/wellbeing/get-journal')
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='add-journal-container'>
        <div className='date-add-journal-container'>
          <label className='date-label' htmlFor='date-input'>
            Date
          </label>
          <input
            id='date-input'
            onChange={dateHandler}
            type='date'
            className='date-input'
            style={{
              color: 'grey',
            }}
          />
        </div>
        <div className='date-add-journal-container'>
          <label htmlFor='title-input' className='title-label'>
            Title
          </label>
          <input
            onChange={titleHandler}
            type='text'
            placeholder='How do you feel today?'
            className='add-journal-text'
            id='title-input'
          />
        </div>
        <div className='date-add-journal-container'>
          <label className='content-label' htmlFor='content-input'>
            Content
          </label>
          <div className='image-container-add-journal'>
            <textarea
              id='content-input'
              onChange={contentHandler}
              type='text'
              placeholder="What's on your mind? Write it down."
              className='text-area'
            />

            <img src={Journal} alt='journal-image' className='journal-image' />
          </div>
        </div>
        <div className='add-journal-button-container'>
          <button className='add-journal-button' onClick={goBack}>
            View my entries
          </button>
          <button type='submit' className='add-journal-button'>
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

export default EditJournal
