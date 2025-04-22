import React from "react";
import { Link } from "react-router-dom";

const parkingData = [
  { id: "A1", status: "dolu" },
  { id: "A2", status: "boş" },
  { id: "A3", status: "boş" },
  { id: "A4", status: "rezervasyon" },
  { id: "A5", status: "dolu" },
  { id: "A6", status: "boş" },
  { id: "A7", status: "boş" },
  { id: "A8", status: "dolu" },
  { id: "A9", status: "dolu" },
  { id: "A10", status: "boş" },
  { id: "A11", status: "rezervasyon" },
  { id: "A12", status: "dolu" },
];

const ParkingPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Otopark Durumu</h2>
      <div className="parking-grid">
        {parkingData.map((spot) => (
          <div
            key={spot.id}
            className={`parking-spot ${spot.status}`}
            style={{ padding: "20px", margin: "10px", width: "80px" }}
          >
            {spot.id}
          </div>
        ))}
      </div>
      <Link to="/user">
        <button className="custom-button">Geri Dön</button>
      </Link>
    </div>
  );
};

export default ParkingPage;
