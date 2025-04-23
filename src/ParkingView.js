import React, { useState, useEffect } from "react";

function ParkingView({ userType }) {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSpot, setHoveredSpot] = useState(null);

  useEffect(() => {
    const lotId = localStorage.getItem("lotId");

    if (lotId === "1") {
      fetch(`https://localhost:5001/api/parkingspaces/GetParkingSpacesByLotId/${lotId}`)
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((space) => ({
            id: space.spaceNumber,
            status: space.isOccupied
              ? "Dolu"
              : space.isReserved
              ? "Rezervasyon"
              : "Boş",
          }));
          setParkingSpots(formatted);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Veri alınamadı:", err);
          setLoading(false);
        });
    } else {
      setTimeout(() => {
        setParkingSpots([
          { id: "B1", status: "Boş" },
          { id: "B2", status: "Dolu" },
          { id: "B3", status: "Rezervasyon" },
        ]);
        setLoading(false);
      }, 500);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{userType === "admin" ? "Yönetici Otoparkı" : "Misafir Otoparkı"}</h2>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="parking-grid">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className={`parking-spot ${spot.status.toLowerCase()}`}
              onMouseEnter={() => spot.status === "Boş" && setHoveredSpot(spot.id)}
              onMouseLeave={() => setHoveredSpot(null)}
              style={{
                margin: "10px",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor:
                  spot.status === "Boş"
                    ? "green"
                    : spot.status === "Dolu"
                    ? "red"
                    : "orange",
                color: "#fff",
                display: "inline-block",
                width: "80px",
                position: "relative",
              }}
            >
              {spot.id} - {spot.status}

              {hoveredSpot === spot.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    zIndex: 10,
                  }}
                >
                  Rezervasyon için Parkify uygulamamızı indirebilirsiniz
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingView;
