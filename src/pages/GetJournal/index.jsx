import { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner } from '../../components'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

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

  const deleteSnack = async (id) => {
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
            <div key={entry_id}>
              <span>{formDate(entry_date)}</span>
              <h1>{entry_title}</h1>
              <p>{entry_content}</p>
              <Link to={`/edit-journal/${entry_id}`}>Edit</Link>
              <button onClick={() => deleteSnack(entry_id)}>Delete</button>
            </div>
          )
        )}
      </>
    )
  }

  function addEntries() {
    navigate('/wellbeing/add-journal')
  }

  let noEntryMessage = 'You have no journal entries. Would you like to add one?'
  if (getJournal.length > 0) {
    noEntryMessage = displayEntries()
  }

  useEffect(() => {
    getEntries()
  }, [])
  return (
    <>
      {loading ? <Spinner /> : noEntryMessage}
      {message}
      <button onClick={addEntries}>+</button>
    </>
  )
}

export default GetJournal
