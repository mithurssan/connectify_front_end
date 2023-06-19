import { useState } from 'react'
import { LoginUser, SignupUser } from '../../pages'
import { useNavigate } from 'react-router-dom'
import './style.css'

const LoginUse = () => {
  const [signIn, setSignIn] = useState(false)
  const [slideAnimation, setSlideAnimation] = useState('')

  const activateSignIn = () => {
    setSlideAnimation('slide-in-animation')
    setTimeout(() => {
      setSignIn(false)
      setSlideAnimation('')
    }, 300)
  }

  const activateRegister = () => {
    setSlideAnimation('slide-in-animation')
    setTimeout(() => {
      setSignIn(true)
      setSlideAnimation('')
    }, 300)
  }

  const navigate = useNavigate()

  const handleSuccessfulRegistration = () => {
    activateSignIn()
    navigate('/login-user')
  }

  return (
    <div className='login-wrapper'>
      <div className={`mainContent ${slideAnimation}`}>
        <div className='topbar'>
          <div className='signup-box'>
            <p
              onClick={activateSignIn}
              className={signIn ? 'sign-in' : 'sign-in-focused'}
            >
              SIGN IN
            </p>
          </div>
          <div className='signin-box'>
            <p
              onClick={activateRegister}
              className={signIn ? 'create-account-focused' : 'create-account'}
            >
              SIGN UP
            </p>
          </div>
        </div>
        {!signIn ? (
          <div data-testid='login-user-form'>
            <LoginUser />
          </div>
        ) : (
          <div data-testid='signup-user-form'>
            <SignupUser
              handleSuccessfulRegistration={handleSuccessfulRegistration}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginUse
