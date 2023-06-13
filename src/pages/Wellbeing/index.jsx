import React from 'react';
import { Link } from 'react-router-dom';
import image from "../../assets/image 27.png";
import journal from "../../assets/image 26.png";
import chat from "../../assets/image 22.png";
import blog from "../../assets/image 24.png";

const Wellbeing = () => {
  return (
    <div className="wellbeing-page">
      <h1>Mental Health</h1>
      <p>Your well-being is important! Strive for a healthy balance between work, personal life, and leisure activities.</p>
      <div className="image-container">
        <img src={image} alt="Importance of mental health" />
      </div>
      <div>
        <Link to="journal">
          <div className="box1">
            <h3>Journal</h3>
            <img src={journal} alt="Journal" width={100} height={100} />
          </div>
        </Link>

        <Link to="chat">
          <div className="box2">
            <h3>Chat with the therapist</h3>
            <img src={chat} alt="Chat with the therapist" width={100} height={100} />
          </div>
        </Link>

        <Link to="blogs">
          <div className="box3">
            <h3>Blogs</h3>
            <img src={blog} alt="Blogs" width={100} height={100} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Wellbeing;

