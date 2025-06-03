import React, { useState, useEffect } from "react";

function AdminParkingView() {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredSpot, setHoveredSpot] = useState(null);
    const [layout, setLayout] = useState({ rows: 1, columns: 1 }); // Başlangıçta 1x1
    const [parkingLotName, setParkingLotName] = useState("");

    useEffect(() => {
        const lotId = parseInt(localStorage.getItem("lotId"));
        if (!lotId) {
            alert("Otopark ID bulunamadı!");
            return;
        }

        // Otopark bilgisi ve layout (rows: toplam kat sayısı, columns: 1 sütun)
        fetch(`http://localhost:5181/api/parkinglots/${lotId}`)
            .then((res) => res.json())
            .then((data) => {
                setParkingLotName(data.name || "");
                setLayout({
                    rows: data.numOfFloors || 1, // Tüm katlar alt alta
                    columns: 1, // Sadece 1 sütun olacak
                });
            })
            .catch((err) => console.error("Otopark bilgisi alınamadı:", err));

        // Tüm katlardaki park alanları alınacak (floorNumber filtresi yok)
        fetch(`http://localhost:5181/api/parkingspaces/GetParkingSpacesByLotId/${lotId}`)
            .then((res) => res.json())
            .then((data) => {
                // Kat numarasına göre sıralayalım (alt alta listeleme için)
                const sorted = data.sort((a, b) => {
                    if (a.floorNumber === b.floorNumber) {
                        return a.spaceNumber.localeCompare(b.spaceNumber);
                    }
                    return a.floorNumber - b.floorNumber;
                });

                // JSON verisini grid görünümüne uygun formata çevirelim
                const formatted = sorted.map((space) => ({
                    id: space.spaceNumber,
                    status: space.isOccupied
                        ? "Dolu"
                        : space.isReserved
                            ? "Rezervasyon"
                            : "Boş",
                    floor: space.floorNumber,
                }));

                setParkingSpots(formatted);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Park alanları alınamadı:", err);
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
                        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`, // 1 sütun
                        gridTemplateRows: `repeat(${layout.rows}, auto)`, // Tüm kat sayısı kadar satır
                        gap: "20px",
                        justifyItems: "center",
                    }}
                >
                    {parkingSpots.map((spot, index) => {
                        const isMarginTop = index > 0 && spot.floor !== parkingSpots[index - 1].floor;
                        return (
                            <div
                                key={spot.id + "-" + index}
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
                                    width: "120px",
                                    textAlign: "center",
                                    position: "relative",
                                    marginTop: isMarginTop ? "30px" : "0px",
                                    transition: "margin 0.3s",
                                }}
                            >
                                {`Kat ${spot.floor} - ${spot.id} - ${spot.status}`}
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

export default AdminParkingView;
