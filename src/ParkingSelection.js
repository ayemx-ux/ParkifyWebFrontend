import React, { useState } from "react"; // useState ve React'i import ediyoruz
import { useNavigate } from "react-router-dom"; // useNavigate'i import ediyoruz

function ParkingSelection() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);
  const navigate = useNavigate(); // navigate'i tanımlıyoruz

  // Otopark verileri (şu an statik)
  const parkingData = {
    Istanbul: {
      Kadikoy: [
        { id: "A1", status: "Dolu" },
        { id: "A2", status: "Boş" },
        { id: "A3", status: "Rezervasyon" },
      ],
      Besiktas: [
        { id: "B1", status: "Boş" },
        { id: "B2", status: "Dolu" },
        { id: "B3", status: "Rezervasyon" },
      ],
    },
    Ankara: {
      Cankaya: [
        { id: "C1", status: "Boş" },
        { id: "C2", status: "Dolu" },
      ],
      Mamak: [
        { id: "D1", status: "Rezervasyon" },
        { id: "D2", status: "Boş" },
      ],
    },
  };

  // Otoparkları göstermek için handleSubmit fonksiyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && district) {
      setSelectedParking(parkingData[city][district]);
      navigate("/parking-view"); // Bu satırla yönlendirme yapılır
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

export default ParkingSelection;
