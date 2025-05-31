import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ParkingSelection() {
    const [lots, setLots] = useState([]);
    const [selectedLotId, setSelectedLotId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5181/api/parkinglots")// get isteği gönderildi çekilen veri json formatta döner db deki otopark listesini alıyor
            .then((res) => res.json())// const data = await response.json();
            .then((data) => {
                setLots(data);
            })
            .catch((err) => {
                console.error("Otopark verisi alınamadı:", err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();  //sayfa yenilenmez

        if (selectedLotId) { //doğrudan misafir girişi içindir kullanıcının seçtiği otoparkı locale kaydediyor
            localStorage.setItem("lotId", selectedLotId);
            localStorage.setItem("userType", "guest");
            navigate("/parking-view");
        } else {
            alert("Lütfen bir otopark seçin.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Otopark Seç</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="custom-button">
                    Park Alanlarını Göster
                </button>
            </form>
        </div>
    );
}

export default ParkingSelection;

