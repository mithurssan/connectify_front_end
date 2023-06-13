import React from 'react';
import { Link } from 'react-router-dom';
import group from "../../assets/group.png";
import journal from "../../assets/image 26.png";
import chat from "../../assets/image 22.png";
import blog from "../../assets/image 24.png";
import "./style.css"

const Wellbeing = () => {
  return (
    <div className="wellbeing-page">
      <h1>Wellbeing</h1>
      <div className="image-container">
        <img src={group} alt="Group of people" />
        <p className="image-description">"Prioritize self-care, and let the ripple effects of <br></br>well-being positively impact all areas of your life."</p>
      </div>
      <div>
      <div className="image-grid">
        <Link to="journal">
          <div className="box1">
            <img src={journal} alt="Journal" width={250} height={250} />
            <h3>Journal</h3>
          </div>
        </Link>

        <Link to="chat">
          <div className="box2">
            <img src={chat} alt="Chat with the therapist" width={250} height={250} />
            <h3>Chat with the therapist</h3>
          </div>
        </Link>

        <Link to="blogs">
          <div className="box3">
            <img src={blog} alt="Blogs" width={250} height={250} />
            <h3>Blogs</h3>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Wellbeing;

