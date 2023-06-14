import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css"

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link to="/" className="not-found-button">Go Back to Main Page</Link>
      <button onClick={goBack} className="not-found-button">Go Back</button>
    </div>
  )
}

export default NotFound
