import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as Pages from './pages'
import {
  NavBar,
  LoginPage,
  LoginUse,
  LoginUseVerify,
  LoginPageVerify,
  BlogCard,
} from './components'
import { loadPersistedState } from './localStorage'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const verified = useSelector((state) => state.app.verified)

  useEffect(() => {
    dispatch(loadPersistedState())
  }, [])

  return (
    <>
      {!token ? (
        <>
          <Routes>
            <Route path='/' element={<Pages.Home />} />
            <Route path='/login-register' element={<LoginPage />} />
            <Route
              path='/businesses/verify/:token'
              element={<LoginPageVerify />}
            />
            <Route path='/login-user' element={<LoginUse />} />
            <Route path='/users/verify/:token' element={<LoginUseVerify />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path='/' element={<NavBar />}>
            <Route path='/dashboard' element={<Pages.Dashboard />} />
            <Route path='/rota' element={<Pages.Rota />} />
            <Route path='/wellbeing' element={<Pages.Wellbeing />} />
            <Route path='/profile' element={<Pages.Profile />} />
            <Route path='/bookings' element={<Pages.Booking />} />
            <Route path='/chat' element={<Pages.Chat />} />
            <Route
              path='/not-assigned'
              element={<Pages.NotAssignedBusiness />}
            />
            <Route
              path='/wellbeing/get-journal'
              element={<Pages.GetJournal />}
            />
            <Route
              path='/wellbeing/add-journal'
              element={<Pages.AddJournal />}
            />
            <Route path='/edit-journal/:id' element={<Pages.EditJournal />} />
            <Route path='/wellbeing/blogs' element={<Pages.Blog />} />
            <Route path='/blogs-card/:id' element={<BlogCard />} />
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
