import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

const tiles = [
  { id: "assetListing", label: "Material Listing", icon: "bi-list", route: '/asset-listing' },
  { id: "assetTracking", label: "Material Tracking", icon: "bi-geo-alt", route: '/asset-tracking' },
  { id: "stockKeeping", label: "Stock Keeping", icon: "bi-box-seam", route: '/stock-keeping' },
  { id: "stockRegister", label: "Stock Register", icon: "bi-journal", route: '/stock-register' },
  { id: "reorder", label: "Reorder", icon: "bi-arrow-repeat", route: '/reorder' },
  { id: "requisition", label: "Requisition", icon: "bi-file-text", route: '/requisition' },
  { id: "inWarding", label: "Inwarding", icon: "bi-arrow-down-circle", route: '/inwarding' },
  { id: "User", label: "User", icon: "bi bi-person", route: '/addUser' },
];

const ModuleList = ({ display }) => {
  const navigate = useNavigate();

  const handleTileClick = (tile) => {
    console.log(`Navigating to: ${tile.route}`);
    navigate(tile.route);  // Navigate to the tile's route
  };

  return (
    <div className="row g-3" style={{
      opacity: display === 'none' ? 0 : 1,
      pointerEvents: display === 'none' ? 'none' : 'auto'
    }}>
      {tiles.map((tile) => (
        <div className="col-md-3" key={tile.id}>
          <div
            className="card text-center p-3 shadow-sm"
            onClick={() => handleTileClick(tile)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <i className={`bi ${tile.icon} mb-2`} style={{ fontSize: '1rem', marginRight: '10px' }}></i>
              <h6>{tile.label}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

ModuleList.propTypes = {
  display: PropTypes.string.isRequired,
};

export default ModuleList;
