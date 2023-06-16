import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Pages from './pages'
import { NavBar, LoginPage, LoginUse, Spinner } from './components'
import useToken from './components/useToken'
import { setToken, removeToken, loadPersistedState } from './actions'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  useEffect(() => {
    dispatch(loadPersistedState())
  }, [])

  const handleSetToken = (token) => {
    dispatch(setToken(token))
  }

  const handleRemoveToken = () => {
    dispatch(removeToken())
  }

  return (
    <>
      {!token ? (
        <>
          <Routes>
            <Route path='/' element={<Pages.Home />} />
            <Route path='/login-register' element={<LoginPage />} />
            <Route path='/login-user' element={<LoginUse />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route path='/dashboard' element={<Pages.Dashboard />} />
            <Route path='/rota' element={<Pages.Rota />} />
            <Route path='/wellbeing' element={<Pages.Wellbeing />} />
            <Route path='/profile/:username' element={<Pages.Profile />} />
            <Route path='/bookings' element={<Pages.Booking />} />
            <Route path='*' element={<Pages.NotFound />} />
          </Route>

          <Route path='/login/user' element={<Pages.LoginUser />} />
          <Route path='/login/business' element={<Pages.LoginBusiness />} />
          <Route path='/signup/business' element={<Pages.SignupBusiness />} />
          <Route path='/signup/user' element={<Pages.SignupUser />} />
          <Route path='/login-register' element={<LoginPage />} />
          <Route path='/login-user' element={<LoginUse />} />
        </Routes>
      )}
    </>
  )
}

export default App
