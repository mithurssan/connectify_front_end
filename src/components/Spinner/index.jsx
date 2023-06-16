import React from 'react'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader-css'
import { TailSpin } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <TailSpin
        height='80'
        width='80'
        color='#0a1a41'
        ariaLabel='tail-spin-loading'
        radius='1'
        visible={true}
      />
    </div>
  )
}

export default Spinner
