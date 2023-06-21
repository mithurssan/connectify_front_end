import { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner } from '../../components'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import Wave from '../../assets/waving-hi.gif'
import './style.css'

const GetJournal = () => {
  const [loading, setLoading] = useState(true)
  const [getJournal, setJournal] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const getEntries = async () => {
    try {
      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token)
      const response = `http://127.0.0.1:5000/entries/user/${decodedToken.user_id}`
      const get = await axios.get(response)
      if (get.status === 200) {
        setJournal(get.data)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } else {
        throw new Error('Cannot fetch the data')
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message)
      } else {
        setMessage(error.message)
      }
    }
  }

  const formDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const deleteEntry = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/entries/delete/${id}`
      )
      if (response.status === 200) {
        window.location.reload(true)
        setTimeout(() => {
          setMessage('Entry has been deleted successfully')
        }, 500)
        setLoading(false)
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message)
      } else {
        setMessage(error.message)
      }
    }
  }

  function displayEntries() {
    return (
      <>
        {getJournal.map(
          ({ entry_id, entry_date, entry_title, entry_content }) => (
            <div key={entry_id} className='content-container'>
              <div className='date-edit-delete'>
                <span className='date'>{formDate(entry_date)}</span>

                <div className='edit-delete-journal'>
                  <Link
                    to={`/edit-journal/${entry_id}`}
                    className='link-button'
                    style={{
                      textDecoration: 'none',
                      color: ' #000000',
                      width: '100px',
                      height: '30px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: ' #d6f0e2',
                      textAlign: 'center',
                      paddingTop: '5.4px',
                      fontSize: '14px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.1)'
                      e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = ''
                      e.target.style.boxShadow = ''
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    className='delete-button'
                    onClick={() => deleteEntry(entry_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className='entry-title'>Title: {entry_title}</div>
              <p className='entry-content'> Content: {entry_content}</p>
            </div>
          )
        )}
      </>
    )
  }

  function addEntries() {
    navigate('/wellbeing/add-journal')
  }

  let noEntryMessage = (
    <p className='no-entry'>
      You have no journal entries. Would you like to add one?
    </p>
  )
  if (getJournal.length > 0) {
    noEntryMessage = displayEntries()
  }

  useEffect(() => {
    getEntries()
  }, [])

  const getCurrentDate = () => {
    const currentDate = new Date()

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }

    return currentDate.toLocaleDateString('en-GB', options)
  }

  // const day = new Date()
  // const getTheDay = day.getDay()
  // const dayNames = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ]

  return (
    <>
      <div className='journal-container'>
        <div className='top-container'>
          <div className='hey-there-container'>
            <img src={Wave} alt='wave' className='wave-hello' />
            <div className='hey-there'>Hey there!</div>
          </div>

          <div className='date-container'>
            {/* <div>{dayNames[getTheDay]}</div> */}
            <div className='now-date'>{getCurrentDate()}</div>
          </div>
        </div>
        <div className='scroll-bar'>
          <div className='content-journal2'>
            <div className='content-journal'>
              {loading ? (
                <div className='spinner-journal'>
                  <Spinner />
                </div>
              ) : (
                noEntryMessage
              )}
            </div>
          </div>
        </div>
        <p className='journal-message'> {message}</p>
      </div>
      <div className='add-entry-journal-container'>
        <button className='add-entries-button ' onClick={addEntries}>
          +
        </button>
      </div>
    </>
  )
}

export default GetJournal
