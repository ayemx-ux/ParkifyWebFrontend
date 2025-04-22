import React, { useState, useEffect } from "react";

function ParkingView({ userType }) {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Otopark verilerini (statik) almak
  useEffect(() => {
    setTimeout(() => {
      // Eğer yönetici ise kendi otoparkını görsün
      if (userType === "admin") {
        setParkingSpots([
          { id: "A1", status: "Dolu" },
          { id: "A2", status: "Boş" },
          { id: "A3", status: "Rezervasyon" },
        ]);
      } else {
        // Kullanıcılar il ve ilçe seçimi yaptıktan sonra farklı otoparklar görsün
        setParkingSpots([
          { id: "B1", status: "Boş" },
          { id: "B2", status: "Dolu" },
          { id: "B3", status: "Rezervasyon" },
        ]);
      }

      setLoading(false);
    }, 1000); // API isteği simülasyonu
  }, [userType]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{userType === "admin" ? "Yönetici Otoparkı Görüntüle" : "Kendi Otoparkınızı Görüntüle"}</h2>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="parking-grid">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`parking-spot ${spot.status.toLowerCase()}`}
              style={{
                margin: "10px",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: spot.status === "Boş" ? "green" : spot.status === "Dolu" ? "red" : "orange",
                color: "#fff",
                display: "inline-block",
                width: "80px",
              }}
            >
              {spot.id} - {spot.status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingView;
