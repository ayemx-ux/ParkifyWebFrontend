import React, { useState, useEffect } from "react";

function ParkingView() {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredSpot, setHoveredSpot] = useState(null);
    const [layout, setLayout] = useState({ rows: 2, columns: 3 });
    const [parkingLotName, setParkingLotName] = useState(""); // Yeni state

    useEffect(() => {
        const lotId = parseInt(localStorage.getItem("lotId"));
        const floorNumber = parseInt(localStorage.getItem("floorNumber"));

        // Otopark bilgilerini çek ve isim set et
        fetch(`http://localhost:5181/api/parkinglots/${lotId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setParkingLotName(data.name || "");
                    if (data.layout) {
                        setLayout({
                            rows: data.layout.rows || 2,
                            columns: data.layout.columns || 3
                        });
                    }
                }
            })
            .catch((err) => console.error("Layout alınamadı:", err));

        // Park yerlerini çek
        fetch(`http://localhost:5181/api/parkingspaces/GetParkingSpacesByLotId/${lotId}`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter((space) => space.floorNumber === floorNumber);
                const formatted = filtered.map((space) => ({
                    id: space.spaceNumber,
                    status: space.isOccupied
                        ? "Dolu"
                        : space.isReserved
                            ? "Rezervasyon"
                            : "Boş"
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
            <h2>{parkingLotName ? `${parkingLotName} Otopark Görünümü` : "Otopark Görünümü"}</h2>
            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${layout.rows}, auto)`,
                        gridAutoFlow: "column",
                        gap: "20px",
                        justifyItems: "center"
                    }}
                >
                    {parkingSpots.map((spot, index) => {
                        const rowGroup = Math.floor(index / (layout.columns * 2));
                        const isFirstItemInGroup = (index % (layout.columns * 2)) === 0 && rowGroup > 0;

                        return (
                            <div
                                key={spot.id}
                                onMouseEnter={() => spot.status === "Boş" && setHoveredSpot(spot.id)}
                                onMouseLeave={() => setHoveredSpot(null)}
                                style={{
                                    padding: "20px",
                                    borderRadius: "5px",
                                    backgroundColor:
                                        spot.status === "Boş"
                                            ? "green"
                                            : spot.status === "Dolu"
                                                ? "red"
                                                : "orange",
                                    color: "#fff",
                                    width: "80px",
                                    textAlign: "center",
                                    position: "relative",
                                    marginTop: isFirstItemInGroup ? "30px" : "0px",
                                    transition: "margin 0.3s"
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
                                            zIndex: 10
                                        }}
                                    >
                                        Rezervasyon için Parkify mobil uygulamamızı indirebilirsiniz
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ParkingView;
