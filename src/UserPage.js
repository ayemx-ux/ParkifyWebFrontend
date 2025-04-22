import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için

function GuestPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate(); // React Router kullanarak yönlendirme

  // Otoparkı seçme işlemi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && district) {
      navigate("/parking-view"); // Yönlendirme yapılacak sayfa
    } else {
      alert("Lütfen il ve ilçe seçin.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Misafir Girişi</h2>
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
              <option value="Kadikoy">Kadıköy</option>
              <option value="Besiktas">Beşiktaş</option>
            </>
          )}
          {city === "Ankara" && (
            <>
              <option value="Cankaya">Çankaya</option>
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

export default GuestPage;
