import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import connectifyhome from '../../assets/connectifyhome.jpg'
import joanne from '../../assets/joanne.jpg'
import phoneapps from '../../assets/phoneapps.jpg'
import laptop from '../../assets/laptop.jpg'

const Home = () => {
  return (
    <div className='Home-page'>
      <h1 className='heading'>Connectify</h1>
      <p className='one-platform'>One Platform, Limitless Connection</p>

      <div className='home-image-container'>
        <img
          className='homepage-image'
          src={connectifyhome}
          alt='Group of employees'
        />
      </div>
      <div className='text-list-container'>
        <div className='text-container'>
          <p className='image-text'>Level up your efficiency with Connectify</p>
        </div>
        <div className='list-container'>
          <ul className='bullet-list'>
            <li>
              Centralise your flow in one app, with access to everything in one
              place
            </li>
            <li>
              Bring the company together through sharing stories and celebrating
              success
            </li>
            <li>Prioritise your well-being during work</li>
          </ul>
        </div>
      </div>

      <div className='section-background'>
        <div className='mini-paragraphs'>
          <p className='mini-paragraph'>65% Customer Satisfaction</p>
          <p className='mini-paragraph'>3x Survey response rates</p>
          <p className='mini-paragraph'>28% Reduction in turnover</p>
          <p className='mini-paragraph'>72% Reduction in helpdesk calls</p>
        </div>
        <div className='centered-text'>
          <p className='centered-paragraph'>
            “Connectify has completely revolutionized how we work with our
            frontline colleagues. By enabling us to communicate freely and
            efficiently, it's broken down the barrier between management and the
            frontline, creating a vibrant and open culture that encourages us
            all to do our best work. ”
          </p>
          <div className='ceo-image-container'>
            <img className='ceoimage' src={joanne} alt='Female CEO' />
            <figcaption className='caption'>
              Joanne Harris |Head of Operations| | Go North West|
            </figcaption>
          </div>
        </div>
      </div>

      <div className='content-container-home'>
        <div className='Features-container'>
          <div className='access-features-more-container'>
            <p className='Access-feature'>1. Access</p>
            <p className='Access-subtext'>Everything needed, in one place.</p>
            <div className='Access-list-container'>
              <ul className='Access-text'>
                <li>
                  Share information. Upload posts and stories to a shared feed.
                </li>
                <li>
                  View you and your teams Rota and schedule bookings for
                  holidays or events in advance
                </li>
                <li>
                  Streamline processes. Create digital forms to digitize
                  processes such as feedback.
                </li>
              </ul>
            </div>
          </div>
          <div className='phone-image-container'>
            <img
              className='phone-image'
              src={phoneapps}
              alt='phone with apps floating around it'
            />
          </div>
        </div>

        <div className='content-container-home'>
          <div className='Features-container2'>
            <div className='laptop-image-container'>
              <img className='laptop-image' src={laptop} alt='laptop' />
            </div>
            <div className='access-features-more-container2'>
              <p className='Access-feature'>2. Internal Communication</p>
              <p className='Access-subtext'>
                Simpler, more effective Internal Communication
              </p>
              <div className='Access-list-container2'>
                <ul className='Access-text'>
                  <li>
                    News Feed. Bring the whole company together with a News Feed
                    that's fun, familiar, and easy to use.
                  </li>
                  <li>
                    Featured Content. Important comms and campaigns can rise
                    above the day-to-day, amplifying your culture.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='btn-holder'>
        <Link to='/login-user'>
          <button className='landing-btn' id='signinemployee-btn'>
            Sign in as an employee
          </button>
        </Link>
        <Link to='/login-register'>
          <button className='employer-btn' id='employer-btn'>
            Sign in as an employer
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
