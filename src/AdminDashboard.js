import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const adminName = localStorage.getItem("adminName");

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Hoşgeldiniz, {adminName}</h2>
            <div className="button-container">
                <Link to="/parking-view">
                    <button className="custom-button">Otoparkımı Görüntüle</button>
                </Link>
                <Link to="/data">
                    <button className="custom-button">Veri Analizi</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminDashboard;
