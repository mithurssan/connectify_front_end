import { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '../../components'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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
          'http://127.0.0.1:5000/entries/add',
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

  const journalSubmitHandler = (e) => {
    e.preventDefault()
    addEntry()
  }

  return (
    <>
      <form onSubmit={journalSubmitHandler}>
        <label>Date</label>
        <input onChange={dateHandler} type='date' value={date} />
        <label>Title</label>
        <input onChange={titleHandler} type='text' value={title} />
        <label>Content</label>
        <input onChange={contentHandler} type='text' value={content} />
        <button type='submit'>Done</button>
        {loaded && <Spinner />}
        <p>{message}</p>
      </form>
    </>
  )
}

export default AddJournal
