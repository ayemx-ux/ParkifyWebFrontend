import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Hoşgeldiniz, Aylin Hanım</h2>
      <div className="button-container">
        <Link to="/parking-view">
          <button className="custom-button">Otoparkımı Görüntüle</button>
        </Link>
        <Link to="/daily-data">
          <button className="custom-button">Günlük Veriler</button>
        </Link>
        <Link to="/weekly-data">
          <button className="custom-button">Haftalık Veriler</button>
        </Link>
        <Link to="/monthly-data">
          <button className="custom-button">Aylık Veriler</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
