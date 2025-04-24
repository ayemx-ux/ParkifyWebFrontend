import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

// Sayfa bileşenlerini import et
import AdminPage from "./AdminPage";
import AdminDashboard from "./AdminDashboard";
import HomePage from "./HomePage";
import ParkingSelection from "./ParkingSelection";
import ParkingView from "./ParkingView";
import Data from "./Data";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Router>
        <div className="app-container">
          <header className="header">
            <h1>Parkify</h1>
          </header>

          {!isLoggedIn && (
              <div className="button-container">
                <Link to="/user">
                  <button className="custom-button">Misafir Girişi</button>
                </Link>
                <Link to="/admin">
                  <button className="custom-button">Yönetici Girişi</button>
                </Link>
              </div>
          )}

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<ParkingSelection />} />
            <Route path="/admin" element={<AdminPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/parking-view" element={<ParkingView userType={isLoggedIn ? "admin" : "guest"} />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
