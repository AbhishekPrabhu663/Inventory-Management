import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import AssetListing1 from './Modules/MaterialListing/Material';
import MaterialTracking from './Modules/MaterialTracking/StoreCreation';
import AddItemsPage from './Modules/MaterialTracking/StoreMaterial';
import Home from './Components/Home';
import './App.css';
import StockKeepingTable from './Modules/StockKeeping/StockKeeping';
import StockRegisterTable from './Modules/StockRegister/StockRegister';
import ReorderTable from './Modules/Reorder/Reorder';
import LoginPage from './Components/LoginPage';
import AddUser from './Modules/AddUser/AddUser';
import { Reorder } from '@mui/icons-material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Implement actual authentication logic here (API call, etc.)
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header />
          <Sidebar display='none' />

          <main className="content p-3">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/asset-listing" element={<AssetListing1 />} />
              <Route path="/asset-tracking" element={<MaterialTracking />} />
              <Route path="/asset-tracking/add-items/:storeId/:id" element={<AddItemsPage />} />
              <Route path="/stock-keeping" element={<StockKeepingTable />} />
              <Route path="/stock-register" element={<StockRegisterTable />} />
              <Route path="/reorder" element={<ReorderTable/>}/>
              <Route path="/addUser" element={<AddUser />} />
              <Route path="*" element={<h3 className="text-center mt-5">Page Not Found</h3>} />
            </Routes>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
