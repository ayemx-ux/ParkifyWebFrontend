import React, { useState, useEffect } from "react";

function ParkingView() {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredSpot, setHoveredSpot] = useState(null);
    const [layout, setLayout] = useState({ rows: 2, columns: 3 });
    const [parkingLotName, setParkingLotName] = useState("");
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [numOfFloors, setNumOfFloors] = useState(1);
    const [lotId, setLotId] = useState(null);

    useEffect(() => {
        const storedLotId = parseInt(localStorage.getItem("lotId"));
        setLotId(storedLotId);
        if (!storedLotId) return;

        fetch(`http://13.48.10.236:5181/api/parkinglots/${storedLotId}`)
            .then((res) => res.json())
            .then((data) => {
                setParkingLotName(data.name || "");
                setNumOfFloors(data.numOfFloors || 1);
                if (data.layout) {
                    setLayout({
                        rows: data.layout.rows || 2,
                        columns: data.layout.columns || 3
                    });
                }
            })
            .catch((err) => console.error("Layout alınamadı:", err));
    }, []);

    useEffect(() => {
        if (!lotId) return;

        fetch(`http://13.48.10.236:5181/api/parkingspaces/GetParkingSpacesByLotId/${lotId}`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (space) => space.floorNumber === selectedFloor
                );
                const formatted = filtered.map((space) => ({
                    id: space.spaceNumber,
                    status: space.isOccupied
                        ? "Dolu"
                        : space.isReserved
                            ? "Rezerve"
                            : "Boş"
                }));
                setParkingSpots(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Veri alınamadı:", err);
                setLoading(false);
            });
    }, [selectedFloor, lotId]);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>
                {parkingLotName ? `${parkingLotName} Otopark Görünümü` : "Otopark Görünümü"}
            </h2>

            {/* ❗ Kat seçimi sadece lotId 4 için */}
            {lotId === 4 && (
                <div style={{ marginBottom: "20px" }}>
                    <label>Kat Seçiniz: </label>
                    <select
                        value={selectedFloor}
                        onChange={(e) => setSelectedFloor(parseInt(e.target.value))}
                        style={{ padding: "8px", borderRadius: "5px" }}
                    >
                        {Array.from({ length: numOfFloors }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{`Kat ${i + 1}`}</option>
                        ))}
                    </select>
                </div>
            )}

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${layout.rows}, auto)`,
                        gap: "20px",
                        justifyItems: "center"
                    }}
                >
                    {parkingSpots.map((spot) => (
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
                                position: "relative"
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
                    ))}
                </div>
            )}
        </div>
    );
}

export default ParkingView;