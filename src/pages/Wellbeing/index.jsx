import React from 'react'
import { Link } from 'react-router-dom'
import group from '../../assets/group.png'
import journal from '../../assets/image 26.png'
import chat from '../../assets/image 22.png'
import blog from '../../assets/image 24.png'
import './style.css'

const Wellbeing = () => {
  return (
    <div className='wellbeing-page'>
      <h1 className='heading'>Mental Health</h1>
      <div className='section'>
        <p className='image-description'>
          <b>
            Your well-being is important! Strive for a<br></br> healthy balance
            between work, personal<br></br> life, and leisure activities.
          </b>{' '}
        </p>
        <div className='image-container'>
          <img src={group} alt='Group of people' />
        </div>
      </div>
      <div>
        <div className='image-grid'>
          <Link to='get-journal' className='link'>
            <div className='box-welbeing'>
              <img src={journal} alt='Journal' width={150} height={150} />
              <h3 className='welbeing-title'>Journal</h3>
            </div>
          </Link>

          <Link to='chat' className='link'>
            <div className='box-chat'>
              <img
                src={chat}
                alt='Chat with the therapist'
                width={150}
                height={150}
                className='chat-image'
              />
              <h3 className='welbeing-title'>Chat with the therapist</h3>
            </div>
          </Link>

          <Link to='blogs' className='link'>
            <div className='box-welbeing'>
              <img src={blog} alt='Blogs' width={150} height={150} />
              <h3 className='welbeing-title'>Blogs</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wellbeing
