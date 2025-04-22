// En üstte tüm import ifadeleri yer almalı
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import "./App.css";  // CSS dosyasını en üste koyuyoruz

// Sayfa bileşenlerini dahil edelim
import UserPage from "./UserPage";
import AdminPage from "./AdminPage"; 
import Dashboard from "./Dashboard"; 
import AdminDashboard from "./AdminDashboard"; 
import HomePage from "./HomePage"; 
import ParkingSelection from "./ParkingSelection";  
import ParkingView from "./ParkingView";  
import DailyData from "./DailyData";  
import WeeklyData from "./WeeklyData";  
import MonthlyData from "./MonthlyData";  

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");  // Kullanıcı tipi: admin veya user

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>Parkify</h1> {/* Değişiklik yapıldı */}
        </header>

        {/* Eğer kullanıcı giriş yapmamışsa butonlar görünsün */}
        {!isLoggedIn && (
          <div className="button-container">
            <Link to="/user">
              <button className="custom-button">Kullanıcı Girişi</button>
            </Link>
            <Link to="/admin">
              <button className="custom-button">Yönetici Girişi</button>
            </Link>
          </div>
        )}

        <Routes>  
          <Route path="/" element={<HomePage />} />   {/* her bir sayfa ve URL yolu için içerik gösterir. */}
          <Route path="/user" element={<UserPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} />
          <Route path="/admin" element={<AdminPage setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/parking-selection" element={<ParkingSelection />} />
          <Route path="/parking-view" element={<ParkingView userType={userType} />} />  
          <Route path="/daily-data" element={<DailyData />} />  
          <Route path="/weekly-data" element={<WeeklyData />} />  
          <Route path="/monthly-data" element={<MonthlyData />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
