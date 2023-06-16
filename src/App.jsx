import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Pages from './pages'
import { NavBar, LoginPage, LoginUse } from './components'
import useToken from './components/useToken'
import { setToken, removeToken } from './actions'

const App = () => {
  const token = useSelector((state) => state.auth.token)
  console.log(token)

  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)

  const handleSetToken = (token) => {
    dispatch(setToken(token))
  }

  const handleRemoveToken = () => {
    dispatch(removeToken())
  }

  return (
    <>
      <Routes>
        <Route path='/login-register' element={<LoginPage />} />
        <Route path='/login-user' element={<LoginUse />} />
        <Route path='/' element={<Pages.Home />} />
        <Route
          path='/'
          element={
            token ? (
              <>
                <NavBar token={handleRemoveToken} />
                <Routes>
                  <Route path='/dashboard' element={<Pages.Dashboard />} />
                  <Route path='/rota' element={<Pages.Rota />} />
                  <Route path='/wellbeing' element={<Pages.Wellbeing />} />
                  <Route
                    path='/profile/:username'
                    element={<Pages.Profile />}
                  />
                  <Route path='/bookings' element={<Pages.Booking />} />
                  <Route path='*' element={<Pages.NotFound />} />
                </Routes>
              </>
            ) : (
              <Navigate to='/login-user' replace />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
