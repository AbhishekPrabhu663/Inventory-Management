import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Inwarding from './Modules/Inwarding/Inwarding';
import ForgotPasswordPage from './Components/ForgotPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });

  const [timer, setTimer] = useState(null);
  const INACTIVITY_TIMEOUT = 2 * 60 * 1000;

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    resetInactivityTimer();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    clearTimeout(timer);
  };

  const resetInactivityTimer = () => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
    setTimer(newTimer);
  };

  const resetTimerOnActivity = () => {
    resetInactivityTimer();
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('mousemove', resetTimerOnActivity);
      window.addEventListener('keydown', resetTimerOnActivity);
      resetInactivityTimer();
      return () => {
        window.removeEventListener('mousemove', resetTimerOnActivity);
        window.removeEventListener('keydown', resetTimerOnActivity);
      };
    }
  }, [isAuthenticated]);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Header onLogout={handleLogout} />
          <Sidebar display='none' />
          <main className="content p-3">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/asset-listing" element={<AssetListing1 />} />
              <Route path="/asset-tracking" element={<MaterialTracking />} />
              <Route path="/asset-tracking/add-items/:storeId/:id" element={<AddItemsPage />} />
              <Route path="/stock-keeping" element={<StockKeepingTable />} />
              <Route path="/stock-register" element={<StockRegisterTable />} />
              <Route path="/reorder" element={<ReorderTable />} />
              <Route path="/inWarding" element={<Inwarding />} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="*" element={<h3 className="text-center mt-5">Page Not Found</h3>} />
            </Routes>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> 
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
