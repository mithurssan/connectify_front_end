import { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '../../components'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Journal from '../../assets/journal.png'
import './style.css'

const AddJournal = () => {
  const [addJournal, setAddJournal] = useState({
    userId: '',
    date: '',
    title: '',
    content: '',
    message: '',
    loaded: false,
  })

  const { userId, date, title, content, message, loaded } = addJournal

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setAddJournal((prevState) => ({
          ...prevState,
          userId: decodedToken.user_id,
        }))
      } catch (error) {
        console.log('Error decoding token:', error)
      }
    }
  }, [])

  const dateHandler = (e) => {
    setAddJournal((prevState) => ({
      ...prevState,
      date: e.target.value,
    }))
  }
  /* c8 ignore start */
  const titleHandler = (e) => {
    setAddJournal((prevState) => ({
      ...prevState,
      title: e.target.value,
    }))
  }

  const contentHandler = (e) => {
    setAddJournal((prevState) => ({
      ...prevState,
      content: e.target.value,
    }))
  }

  const addEntry = async () => {
    if (date && title && content) {
      try {
        const data = {
          user_id: userId,
          entry_date: date,
          entry_title: title,
          entry_content: content,
        }
        console.log(data)

        const response = await axios.post(
          'https://connectify-server-b31a.onrender.com/entries/add',
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(response.data)

        if (response.status === 201 || response.status === 200) {
          setAddJournal((prevState) => ({
            ...prevState,
            message: 'Entry added successfully',
            loaded: true,
          }))

          setTimeout(() => {
            navigate('/wellbeing/get-journal')
          }, 500)
        } else {
          throw new Error('There was a problem creating your entry.')
        }
      } catch (error) {
        setAddJournal((prevState) => ({
          ...prevState,
          message: error.message,
        }))

        setTimeout(() => {
          setAddJournal((prevState) => ({
            ...prevState,
            loaded: false,
          }))
        }, 500)
      }
    } else {
      setAddJournal((prevState) => ({
        ...prevState,
        message: 'Please enter your entry',
      }))

      setTimeout(() => {
        setAddJournal((prevState) => ({
          ...prevState,
          loaded: false,
          message: '',
        }))
      }, 5000)
    }
  }
  /* c8 ignore end */
  const journalSubmitHandler = (e) => {
    e.preventDefault()
    addEntry()
  }
  const goBack = () => {
    navigate('/wellbeing/get-journal')
  }

  return (
    <>
      <form
        role='form'
        onSubmit={journalSubmitHandler}
        className='add-journal-container'
      >
        <div className='date-add-journal-container'>
          <label className='date-label' htmlFor='date-input'>
            Date
          </label>
          <input
            className='date-input'
            onChange={dateHandler}
            type='date'
            value={date}
            style={{
              color: 'grey',
            }}
            id='date-input'
          />
        </div>
        <div className='date-add-journal-container'>
          <label className='title-label' htmlFor='title-input'>
            Title
          </label>
          <input
            className='add-journal-text'
            id='title-input'
            onChange={titleHandler}
            type='text'
            value={title}
            placeholder='How do you feel today?'
          />
        </div>
        <div className='date-add-journal-container'>
          <label className='content-label' htmlFor='content-input'>
            Content
          </label>
          <div className='image-container-add-journal'>
            <textarea
              onChange={contentHandler}
              type='text'
              value={content}
              id='content-input'
              className='text-area'
              placeholder="What's on your mind? Write it down."
            />

            <img src={Journal} alt='journal-image' className='journal-image' />
          </div>
        </div>
        <div className='add-journal-button-container'>
          <button className='add-journal-button' onClick={goBack}>
            View my entries
          </button>
          <button className='add-journal-button' type='submit'>
            Done
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

export default AddJournal
