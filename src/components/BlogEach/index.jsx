import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { blogs } from '../BlogDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const BlogEach = () => {
  let { id } = useParams()
  const navigate = useNavigate()

  const filterBlogs = blogs.find((el) => el.id === parseInt(id))

  const backButton = () => {
    if (filterBlogs.id > 1) {
      navigate(`/blogs-card/${parseInt(id) - 1}`)
    } else {
      navigate('/blogs-card/5')
    }
  }
/* c8 ignore start */
  const nextButton = () => {
    if (filterBlogs.id < 5) {
      navigate(`/blogs-card/${parseInt(id) + 1}`)
    } else {
      navigate(`/blogs-card/1`)
    }
  }
/* c8 ignore end */
  const viewBlogs = () => {
    navigate('/wellbeing/blogs')
  }

  return (
    <div>
      <div key={filterBlogs.id} className='every-blog-container'>
        <h1 className='every-blog-title'>{filterBlogs.title}</h1>

        <img
          src={filterBlogs.image}
          alt='image-blog-card'
          className='every-blog-image'
        />
        <span className='every-blog-date'>{filterBlogs.date}</span>
        <div className='every-blog-information-container'>
          <h4 className='every-blog-heading'>{filterBlogs.heading1}</h4>
          <p className='every-blog-details'>{filterBlogs.details1}</p>
          <h4 className='every-blog-heading'>{filterBlogs.heading2}</h4>
          <p className='every-blog-details'>{filterBlogs.details2}</p>
          <h4 className='every-blog-heading'>{filterBlogs.heading3}</h4>
          <p className='every-blog-details'>{filterBlogs.details3}</p>
        </div>
      </div>

      <div className='button-every-blog-container'>
        <button
          onClick={backButton}
          className='every-blog-previous-next-button button-every-blog'
          data-testid='back-button'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={viewBlogs}
          className='every-view-all-button button-every-blog'
          data-testid='view-all-button'
        >
          View All Blogs
        </button>
        <button
          onClick={nextButton}
          className='every-blog-previous-next-button button-every-blog'
          data-testid='next-button'
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  )
}

export default BlogEach
