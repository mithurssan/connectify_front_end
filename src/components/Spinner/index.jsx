import React from 'react'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader-css'
import { Audio, Bars, RotatingLines } from 'react-loader-spinner'
import './style.css'

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <RotatingLines
        height='800'
        width='300'
        strokeColor='#f99776'
        strokeWidth='5'
        animationDuration='0.75'
        visible={true}
      />
      <h1 className='loading-data'>Loading data..</h1>
    </div>
  )
}

export default Spinner
