import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ParkingSelection() {
    const [lots, setLots] = useState([]);
    const [selectedLotId, setSelectedLotId] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [floors, setFloors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5181/api/parkinglots")
            .then((res) => res.json())
            .then((data) => setLots(data))
            .catch((err) => console.error("Otopark verisi alınamadı:", err));
    }, []);

    useEffect(() => {
        if (selectedLotId) {
            const lot = lots.find((lot) => lot.lotId === parseInt(selectedLotId));
            if (lot && lot.numOfFloors) {
                const floorsArr = Array.from({ length: lot.numOfFloors }, (_, i) => i + 1);
                setFloors(floorsArr);
            } else {
                setFloors([]);
            }
        } else {
            setFloors([]);
            setSelectedFloor("");
        }
    }, [selectedLotId, lots]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedLotId && selectedFloor) {
            localStorage.setItem("lotId", selectedLotId);
            localStorage.setItem("floorNumber", selectedFloor);
            localStorage.setItem("userType", "guest");
            navigate("/parking-view");
        } else {
            alert("Lütfen bir otopark seçin.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Otopark Seçin</h2>
            <form onSubmit={handleSubmit}>
                {/* Otopark Seçimi */}
                <select
                    value={selectedLotId}
                    onChange={(e) => setSelectedLotId(e.target.value)}
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

                <br />

                {/* Kat Seçimi */}
                {floors.length > 0 && (
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
                        {floors.map((floor) => (
                            <option key={floor} value={floor}>
                                {floor}. Kat
                            </option>
                        ))}
                    </select>
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
