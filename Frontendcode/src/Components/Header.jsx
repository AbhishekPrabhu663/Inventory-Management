import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState); // Toggle the sidebar visibility
  };

  const handleHomeClick = () => {
    navigate("/home"); // Navigate to /home route
  };

  const handleLinkClick = (link) => {
    setIsSidebarOpen(false); // Close sidebar after clicking a link
  };
  

  return (
    <div>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* Home Button */}
              <li className="nav-link px-2 link-body-emphasis">
                <button
                  onClick={handleHomeClick} // Navigate to /home on click
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Home
                </button>
              </li>

              {/* Inventory Button with Sidebar */}
              <li className="nav-link px-2 link-body-emphasis">
                <div style={{ position: "relative" }}>
                  <button
                    onClick={handleSidebarToggle} // Toggle sidebar visibility on click
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    
                  >
                    Inventory
                  </button>

                  {/* Sidebar will appear below the Inventory button */}
                  {isSidebarOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        background: "#fff",
                        border: "1px solid #ccc",
                        zIndex: 1000,
                        width: "1000px", // Adjusted width for a cleaner look
                        height: "220px", // Adjusted height
                        borderRadius: "8px", // Rounded corners
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
                      }}
                    >
                      <Sidebar onLinkClick={handleLinkClick} />
                    </div>
                  )}
                </div>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <select className="form-control" aria-label="Dropdown">
                <option value="" disabled selected>
                  Select an Area
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu text-small">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
