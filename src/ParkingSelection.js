import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ParkingSelection() {
  const [lots, setLots] = useState([]);
  const [selectedLotId, setSelectedLotId] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const navigate = useNavigate();

<<<<<<< HEAD
    useEffect(() => {
<<<<<<< HEAD
        fetch("http://localhost:5181/api/parkinglots")// get isteği gönderildi çekilen veri json formatta döner db deki otopark listesini alıyor
            .then((res) => res.json())// const data = await response.json();
=======
        fetch("http://localhost:5181/api/parkinglots") // get isteği gönderildi çekilen veri json formatta döner db deki otopark listesini alıyor
            .then((res) => res.json()) // const data = await response.json();
>>>>>>> 045407a (Son güncellemeler eklendi)
            .then((data) => {
                setLots(data);
            })
            .catch((err) => {
                console.error("Otopark verisi alınamadı:", err);
            });
    }, []);
=======
  useEffect(() => {
    fetch("http://localhost:5181/api/parkinglots")
      .then((res) => res.json())
      .then((data) => setLots(data))
      .catch((err) => console.error("Otopark verisi alınamadı:", err));
  }, []);
>>>>>>> 505c831 (Projenin son hali)

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< HEAD
<<<<<<< HEAD
        if (selectedLotId) { //doğrudan misafir girişi içindir kullanıcının seçtiği otoparkı locale kaydediyor
=======
        if (selectedLotId) {  //doğrudan misafir girişi içindir kullanıcının seçtiği otoparkı locale kaydediyor
>>>>>>> 045407a (Son güncellemeler eklendi)
            localStorage.setItem("lotId", selectedLotId);
            localStorage.setItem("userType", "guest");
            navigate("/parking-view");
        } else {
            alert("Lütfen bir otopark seçin.");
        }
    };
=======
    if (selectedLotId === "4" && selectedFloor === "") {
      alert("Lütfen bir kat seçin.");
      return;
    }
>>>>>>> 505c831 (Projenin son hali)

    localStorage.setItem("lotId", selectedLotId);
    localStorage.setItem("userType", "guest");

    if (selectedLotId === "4") {
      localStorage.setItem("floor", selectedFloor);
    } else {
      localStorage.removeItem("floor"); // Diğer lotlar için kat bilgisi silinir
    }

    navigate("/parking-view");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Otopark Seç</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedLotId}
          onChange={(e) => {
            setSelectedLotId(e.target.value);
            setSelectedFloor(""); // lot değişince kat da sıfırlanmalı
          }}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "300px",
            borderRadius: "5px",
            backgroundColor: "#222",
            color: "#fff",
            border: "1px solid #444"
          }}
        >
          <option value="">Bir otopark seçin</option>
          {lots.map((lot) => (
            <option key={lot.lotId} value={lot.lotId}>
              {lot.name}
            </option>
          ))}
        </select>

        {/* Başkent Üniversitesi (lotId = 4) seçilince kat seçimi */}
        {selectedLotId === "4" && (
          <div>
            <p>Bu otopark 3 katlıdır. Lütfen kat seçin:</p>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              style={{
                padding: "10px",
                marginBottom: "20px",
                width: "300px",
                borderRadius: "5px",
                backgroundColor: "#222",
                color: "#fff",
                border: "1px solid #444"
              }}
            >
              <option value="">Bir kat seçin</option>
              <option value="1">Kat 1</option>
              <option value="2">Kat 2</option>
              <option value="3">Kat 3</option>
            </select>
          </div>
        )}

        <br />
        <button type="submit" className="custom-button">
          Park Alanlarını Göster
        </button>
      </form>
    </div>
  );
}

export default ParkingSelection;
<<<<<<< HEAD

=======
>>>>>>> 505c831 (Projenin son hali)
