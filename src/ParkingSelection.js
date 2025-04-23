import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ParkingSelection() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city && district) {
      if (city === "Ankara" && district === "Başkent Üniversitesi") {
        localStorage.setItem("lotId", "1"); // Başkent için gerçek veri
      } else {
        localStorage.removeItem("lotId"); // Diğer ilçeler için sahte veri
      }

      navigate("/parking-view"); // Her durumda aynı sayfaya yönlendirilir
    } else {
      alert("Lütfen il ve ilçe seçin.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Otopark Seçim Sayfası</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "250px",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
          }}
        >
          <option value="">Bir il seçin</option>
          <option value="Istanbul">İstanbul</option>
          <option value="Ankara">Ankara</option>
        </select>
        <br />
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "250px",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444",
          }}
        >
          <option value="">Bir ilçe seçin</option>
          {city === "Istanbul" && (
            <>
              <option value="Kadıköy">Kadıköy</option>
              <option value="Beşiktaş">Beşiktaş</option>
            </>
          )}
          {city === "Ankara" && (
            <>
              <option value="Başkent Üniversitesi">Başkent Üniversitesi</option>
              <option value="Çankaya">Çankaya</option>
              <option value="Mamak">Mamak</option>
            </>
          )}
        </select>
        <br />
        <button type="submit" className="custom-button">
          Otoparkı Görüntüle
        </button>
      </form>
    </div>
  );
}

export default ParkingSelection;
