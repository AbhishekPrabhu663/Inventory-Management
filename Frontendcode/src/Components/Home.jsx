import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'],
  datasets: [
    {
      label: 'Assets Added',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.7)', // Vibrant teal
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Stock Reordered',
      data: [7, 11, 5, 8, 3],
      backgroundColor: 'rgba(255, 159, 64, 0.7)', // Bright orange
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Inventory Activity Overview',
    },
  },
};

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header Section */}
      <header
        style={{
          background: "linear-gradient(135deg, #3a7bd5, #3a6073)",
          color: "white",
          padding: "50px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", marginBottom: "10px" }}>
          Inventory Management
        </h1>
        <p style={{ fontSize: "1.1rem" }}>
          Track, manage, and optimize your assets and stock seamlessly.
        </p>
      </header>

      {/* Main Content Section */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 20px",
        }}
      >
        <section
          style={{
            textAlign: "center",
            marginBottom: "40px",
            maxWidth: "700px",
          }}
        >
          <h2 style={{ color: "#333", fontSize: "2rem" }}>Welcome Back!</h2>
          <p style={{ fontSize: "1rem", color: "#666" }}>
            Your dashboard is ready. View asset details, manage stock, and process requisitions efficiently.
          </p>
        </section>

        {/* Chart Section */}
        <div style={{ width: '80%', maxWidth: '900px', marginBottom: '40px' }}>
          <Bar data={data} options={options} />
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/asset-listing")}
            style={buttonStyle}
          >
            View Assets
          </button>
          <button
            onClick={() => navigate("/stock-keeping")}
            style={buttonStyle}
          >
            Manage Stock
          </button>
          <button
            onClick={() => navigate("/requisition")}
            style={buttonStyle}
          >
            Handle Requisitions
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "white",
          textAlign: "center",
          padding: "15px 0",
        }}
      >
        <p>&copy; 2024 Inventory Management App</p>
      </footer>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "#3a7bd5",
  color: "white",
  padding: "15px 30px",
  fontSize: "1.1rem",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "transform 0.2s",
};

export default Home;