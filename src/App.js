import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";

import AdminPage from "./AdminPage";
import AdminDashboard from "./AdminDashboard";
import HomePage from "./HomePage";
import ParkingSelection from "./ParkingSelection";
import ParkingView from "./ParkingView";
import Data from "./Data";
import PenaltyList from "./PenaltyList";
import ComplaintsDashboard from "./ComplaintsDashboard";


function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setHasClicked(false);
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Parkify</h1>
      </header>

      {!isLoggedIn && location.pathname === "/" && !hasClicked && (
        <div className="button-container">
          <Link to="/user">
            <button className="custom-button" onClick={() => setHasClicked(true)}>
              Misafir Girişi
            </button>
          </Link>
          <Link to="/admin">
            <button className="custom-button" onClick={() => setHasClicked(true)}>
              Yönetici Girişi
            </button>
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<ParkingSelection />} />
        <Route path="/admin" element={<AdminPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/parking-view" element={<ParkingView userType={isLoggedIn ? "admin" : "guest"} />} />
        <Route path="/data" element={<Data />} />
        <Route path="/penalties" element={<PenaltyList />} />
      <Route path="/complaints" element={<ComplaintsDashboard />} />

      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
