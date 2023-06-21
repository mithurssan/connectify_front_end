import React from 'react'
import './style.css'
import Employee from '../../assets/employee-anniversary-employee.gif'
const NotAssignedBusiness = () => {
  return (
    <div>
      <div className='not-assigned-container'>
        <div className='not-assigned-message'>
          You have not been assigned to a business yet, while you wait check out
          some of our other features!
        </div>
      </div>
    </div>
  )
}

export default NotAssignedBusiness
