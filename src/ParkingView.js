import React, { useState, useEffect } from "react";
import NavigationButtons from "./NavigationButtons";

function ParkingView() {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredSpot, setHoveredSpot] = useState(null);

    useEffect(() => {
        const lotId = parseInt(localStorage.getItem("lotId"));
        const floor = localStorage.getItem("floor"); // sadece Başkent için vardır
        console.log("Aktif lotId:", lotId, "Kat:", floor);

        // endpoint'e kat bilgisi ekle (sadece varsa)
        const url = floor
            ? `http://localhost:5181/api/parkingspaces/GetParkingSpacesByLotId/${lotId}?floor=${floor}`
            : `http://localhost:5181/api/parkingspaces/GetParkingSpacesByLotId/${lotId}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`API isteği başarısız: ${res.status}`);
                }
                return res.json();
            })
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
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Otopark Görünümü</h2>
            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div className="parking-grid">
                    {parkingSpots.map((spot) => (
                        <div
                            key={spot.id}
                            className={`parking-spot ${spot.status.toLowerCase()}`}
                            onMouseEnter={() =>
                                spot.status === "Boş" && setHoveredSpot(spot.id)
                            }
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
                                    Rezervasyon için Parkify mobil uygulamamızı
                                    indirebilirsiniz
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <NavigationButtons />
        </div>
    );
}

export default ParkingView;
