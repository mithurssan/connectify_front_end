import React from 'react'
import BlogPost from '../../assets/blogTop.png'
import { blogs } from '../../components/BlogDetails'
import { Link } from 'react-router-dom'
import './style.css'

const Blog = () => {
  return (
    <div className='blog-container'>
      <div className='blog-post-container'>
        <div className='top-container-blog'>
          <div className='image-wrapper'>
            <img src={BlogPost} alt='blogPost' className='blog-image' />
          </div>
          <p className='top-container-blog-description'>
            Step into a sanctuary of well-being as you embark on a journey of
            self-care and personal growth. Welcome to our nurturing well-being
            blog, where we share insights, tips, and inspiration to enhance your
            overall wellness.
          </p>
        </div>
        <div
          className='blog-details-container'
          data-testid='blog-post-container'
        >
          {blogs.map(({ id, title, date, image, details }) => (
            <Link
              to={`/blogs-card/${id}`}
              className='link'
              key={id}
              role='link'
            >
              <div className='each-blog-container'>
                <div className='blog-description-container'>
                  <div className='title-blog' data-testid='blog-title'>
                    {title}
                  </div>
                  <span className='date-blog' data-testid='blog-title'>
                    {date}
                  </span>
                  <p
                    className='blog-details'
                    data-testid='blog-details-container'
                  >
                    {details}
                  </p>
                </div>
                <div className='blog-image-container'>
                  <img src={image} alt='blog-image' className='image-blog' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
