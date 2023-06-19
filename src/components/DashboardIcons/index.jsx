import React from 'react';
import "./style.css"

const DashboardIcons = ({ title, image }) => {
  return (
    <div className="dashboard-icon">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default DashboardIcons;
