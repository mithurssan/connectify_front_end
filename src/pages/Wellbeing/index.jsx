import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import group from '../../assets/group.png'
import journal from '../../assets/image 26.png'
import chat from '../../assets/image 22.png'
import blog from '../../assets/image 24.png'
import './style.css'
import introJs from 'intro.js'
import 'intro.js/minified/introjs.min.css'
import { Chatbot } from '../../components'

const Wellbeing = () => {
  useEffect(() => {
    const intro = introJs()
    intro.setOptions({
      steps: [
        {
          intro: 'Welcome to the Wellbeing page!',
        },
        {
          element: '.box1',
          intro:
            'Explore the Journal section for personal reflection and well-being.',
        },
        {
          element: '.box2',
          intro: 'Chat with a therapist to seek guidance and support.',
        },
        {
          element: '.box3',
          intro: 'Read insightful blogs on various mental health topics.',
        },
      ],
    })
    intro.start()
  }, [])
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

      <Chatbot />

      <div>
        <div className='image-grid'>
          <Link to='get-journal' className='link'>
            <div className='box-welbeing'>
              <img
                src={journal}
                alt='Journal'
                width={250}
                height={250}
                className='welbeing-image'
              />
              <h3 className='icon-title'>Journal</h3>
            </div>
          </Link>
          {/* 
          <Link to='chat' className='link'>
            <div className='box-welbeing'>
              <img
                src={chat}
                alt='Chat with the therapist'
                width={250}
                height={250}
                className='welbeing-chat'
              />
              <h3 className='icon-title'>Chat with the therapist</h3>
            </div>
          </Link> */}

          <Link to='blogs' className='link'>
            <div className='box-welbeing'>
              <img
                src={blog}
                alt='Blogs'
                width={250}
                height={250}
                className='welbeing-image'
              />
              <h3 className='icon-title'>Blogs</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Wellbeing
