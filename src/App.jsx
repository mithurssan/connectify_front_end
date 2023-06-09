import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./pages"
import { NavBar } from './components';
import "./App.css"

const App = () => {
  return (
    <Routes>
      <Route>
        <Route path="/home" element={<Pages.Home />} />
        <Route path="/" element={<NavBar />}>
          <Route path="/rota" element={<Pages.Rota />} />
          <Route path="/wellbeing" element={<Pages.Wellbeing />} />
          <Route path="/dashboard" element={<Pages.Dashboard />} />
          <Route path="/profile/:username" element={<Pages.Profile />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/signup" element={<Pages.Signup />} />

          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
