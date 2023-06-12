import React from 'react'
import { Link } from 'react-router-dom';

const Wellbeing = () => {
  return (
    <div className="wellbeing-page">
    <h2>Welcome to the Wellbeing Page!</h2>
    <div className="carousel-container">
        <div className="carousel">
        </div>
    </div>
    <div>
      <Link to="journal">
        <div className="box1">
        <h3>Journal</h3>
        <img src="" alt="" width={100} height={100} />
        </div>
      </Link>


      <Link to="chat">
        <div className="box2">
        <h3>Chat with the therapist</h3>
        <img src="" alt="" width={100} height={100} />
        </div>
      </Link>


      <Link to="blogs">
        <div className="box3">
        <h3>Blogs</h3>
        <img src="" alt="" width={100} height={100} />
        </div>
      </Link>


    </div>
    </div>
  )
}

export default Wellbeing
