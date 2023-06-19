import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../components'
import jwtDecode from 'jwt-decode'

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
          `http://127.0.0.1:5000/entries/update/${id}`,
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
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input onChange={dateHandler} type='date' />
        <label>Title</label>
        <input onChange={titleHandler} type='text' />
        <label>Content</label>
        <input onChange={contentHandler} type='text' />
        <button type='submit'>Update</button>
        {loaded && <Spinner />}
        <p>{message}</p>
      </form>
    </>
  )
}

export default EditJournal
