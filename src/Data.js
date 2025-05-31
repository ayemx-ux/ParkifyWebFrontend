import React, { useEffect, useState } from "react";
<<<<<<< HEAD

function Data() {
    const [lotId, setLotId] = useState(null);
    const [lotName, setLotName] = useState("");
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("lotId");
        if (id) {
            setLotId(parseInt(id));

            fetch("http://localhost:5181/api/parkinglots")
                .then((res) => res.json())
                .then((data) => {
                    const lot = data.find((l) => l.lotId === parseInt(id));
                    if (lot) {
                        setLotName(lot.name);

                        const safeName = lot.name.trim().replace(/\s+/g, "_");
                        const base = "http://localhost:8000/static/plots";

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
        const response = await fetch("http://localhost:8000/generate-plots", {
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

=======
import NavigationButtons from "./NavigationButtons";

function Data() {
  const [lotId, setLotId] = useState(null);
  const [lotName, setLotName] = useState("");
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("lotId");
    if (id) {
      setLotId(parseInt(id));

      fetch("http://localhost:5181/api/parkinglots")
        .then((res) => res.json())
        .then((data) => {
          const lot = data.find((l) => l.lotId === parseInt(id));
          if (lot) {
            setLotName(lot.name);

            const safeName = lot.name.trim().replace(/\s+/g, "_");
            const base = "http://localhost:8000/static/plots";

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
    const response = await fetch("http://localhost:8000/generate-plots", {
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
      <NavigationButtons />
    </div>
  );
}

>>>>>>> 505c831 (Projenin son hali)
export default Data;
