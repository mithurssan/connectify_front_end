import { useState } from 'react'
import { LoginBusiness, SignupBusiness } from '../../pages'
import LoginImage from '../../assets/loginPage.png'

const LoginPage = () => {
  const [signIn, setSignIn] = useState(false)

  const activateSignIn = () => {
    setSignIn(true)
  }

  const activateRegister = () => {
    setSignIn(false)
  }

  return (
    <div className='login-wrapper'>
      <button onClick={activateSignIn}>SIGN IN</button>
      <button onClick={activateRegister}>SIGN UP</button>
      <div className='mainContent'>
        {signIn ? <LoginBusiness /> : <SignupBusiness />}
        <img src={LoginImage} alt='login-page' />
      </div>
    </div>
  )
}

export default LoginPage
