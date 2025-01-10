import React from "react";
import "../App.css";
import PropTypes from 'prop-types';
import ModuleList from './ModuleList'; 

const Sidebar = ({ onPageChange, display }) => {
  console.log("Sidebar props:", { onPageChange, display });
  
  return (
    <div className="container mt-5" style={{ display: display }}>
      <ModuleList onPageChange={onPageChange}/>  {/* Render TileList here */}
    </div>
  );
};

Sidebar.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired
};

export default Sidebar;
