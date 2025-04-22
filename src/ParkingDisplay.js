import React from "react";

function ParkingDisplay() {
  // Otopark verilerini burada göstereceğiz. (Burada statik veri kullanıyoruz)
  const parkingSpots = [
    { id: "A1", status: "Dolu" },
    { id: "A2", status: "Boş" },
    { id: "A3", status: "Rezervasyon" },
    { id: "A4", status: "Boş" },
    { id: "A5", status: "Dolu" },
    { id: "A6", status: "Boş" },
    { id: "A7", status: "Rezervasyon" },
    { id: "A8", status: "Boş" },
    { id: "A9", status: "Dolu" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Otopark Durumu</h2>
      <div className="parking-grid">
        {parkingSpots.map((spot) => (
          <div
            key={spot.id}
            className={`parking-spot ${spot.status.toLowerCase()}`}
          >
            {spot.id} - {spot.status}
          </div>
        ))}
      </div>

      {/* Rezervasyon mesajı ve mobil uygulama indirme linki */}
      <div style={{ marginTop: "40px" }}>
        <h3>Rezervasyon yaptırmak istiyorsanız mobil uygulamamızı indirebilirsiniz:</h3>
        <a 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            textDecoration: "none", 
            color: "#fff", 
            padding: "10px 20px", 
            backgroundColor: "#007BFF", 
            borderRadius: "5px", 
            fontSize: "18px",
            display: "inline-block", 
            marginTop: "10px" 
          }}
        >
          Mobil Uygulamayı İndir
        </a>
      </div>
    </div>
  );
}

export default ParkingDisplay;
