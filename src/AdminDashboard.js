import React from "react";
import NavigationButtons from "./NavigationButtons";
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

                <Link to="/penalties">
                    <button className="custom-button">Ceza Kayıtlarını Gör</button>
                </Link>

                <Link to="/complaints">
                    <button
                        className="custom-button"
                    >
                        Şikayetleri Gör
                    </button>
                </Link>
            </div>

            <NavigationButtons />
        </div>
    );
}

export default AdminDashboard;