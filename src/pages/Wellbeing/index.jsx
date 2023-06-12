import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from "../../assets/image 27.png"
import journal from "../../assets/image 26.png"
import chat from "../../assets/image 22.png"
import blog from "../../assets/image 24.png"

const Wellbeing = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="wellbeing-page">
      <h2>Mental Health</h2>
      <p>Your well-being is important! Strive for a healthy balance between work, personal life, and leisure activities. </p>
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image1} alt="" />
          </div>
        </Slider>
      </div>
    <div>
      <Link to="journal">
        <div className="box1">
        <h3>Journal</h3>
        <img src={journal} alt="" width={100} height={100} />
        </div>
      </Link>


      <Link to="chat">
        <div className="box2">
        <h3>Chat with the therapist</h3>
        <img src={chat} alt="" width={100} height={100} />
        </div>
      </Link>


      <Link to="blogs">
        <div className="box3">
        <h3>Blogs</h3>
        <img src={blog} alt="" width={100} height={100} />
        </div>
      </Link>


    </div>
    </div>
  )
}

export default Wellbeing
