import React, { useEffect, useState } from "react";

function Data() {
    const [lotId, setLotId] = useState(null);
    const [lotName, setLotName] = useState("");
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("lotId");
        if (id) {
            setLotId(parseInt(id));

            // .NET backend için IP ve port
            fetch("http://13.51.15.3:5181/api/parkinglots")
                .then((res) => res.json())
                .then((data) => {
                    const lot = data.find((l) => l.lotId === parseInt(id));
                    if (lot) {
                        setLotName(lot.name);

                        const safeName = lot.name.trim().replace(/\s+/g, "_");
                        // Python FastAPI (8000)
                        const base = "http://13.51.15.3:8000/static/plots";

                        const filenames = [
                            `${safeName}_heatmap.png`,
                            `${safeName}_space_weekly_usage.png`,
                            `${safeName}_occupancy_rate.png`,
                        ];

                        setImageList(filenames.map((name) => `${base}/${name}`));
                    }
                });
        }
    }, []);

    const handleGeneratePlots = async () => {
        // Python FastAPI
        const response = await fetch("http://13.51.15.3:8000/generate-plots", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lot_id: parseInt(localStorage.getItem("lotId")) }),
        });

        if (response.ok) {
            alert("Grafikler üretildi!");
            window.location.reload();
        } else {
            alert("Grafik üretimi başarısız.");
        }
    };

    if (!lotId || !lotName) return <p>Yükleniyor...</p>;

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>{lotName} - Veri Analizi</h2>
            <button className="custom-button" onClick={handleGeneratePlots}>
                Grafikleri Oluştur
            </button>
            {imageList.map((src, index) => (
                <div key={index} style={{ marginBottom: "40px" }}>
                    <img
                        src={src}
                        alt={`Grafik ${index + 1}`}
                        style={{ maxWidth: "800px", width: "100%" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default Data;
