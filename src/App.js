import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import "./App.css";

import AdminPage from "./AdminPage";
import AdminDashboard from "./AdminDashboard";
import HomePage from "./HomePage";
import ParkingSelection from "./ParkingSelection";
import ParkingView from "./ParkingView";
<<<<<<< HEAD
<<<<<<< HEAD
import Data from "./Data";
=======
import AllData from "./Data"; 
>>>>>>> bcf2504 (Otopark projesi yedeği)
=======
import Data from "./Data";
import PenaltyList from "./PenaltyList";
>>>>>>> 505c831 (Projenin son hali)

function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasClicked, setHasClicked] = useState(false); // 👈 Yeni eklenen state

  // Ana sayfaya dönülünce butonları tekrar göster
  useEffect(() => {
    if (location.pathname === "/") {
      setHasClicked(false);
    }
  }, [location.pathname]);

  return (
<<<<<<< HEAD
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
=======
    <div className="app-container">
      <header className="header">
        <h1>Parkify</h1>
      </header>

      {/* Sadece anasayfadaysa ve henüz giriş yapılmadıysa butonları göster */}
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
        <Route
          path="/parking-view"
          element={<ParkingView userType={isLoggedIn ? "admin" : "guest"} />}
        />
        <Route path="/data" element={<Data />} />
        <Route path="/penalties" element={<PenaltyList />} />
      </Routes>
    </div>
  );
}

// Router'ı AppWrapper dışında tanımlıyoruz
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
>>>>>>> 505c831 (Projenin son hali)
  );
}

export default App;
