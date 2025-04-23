import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

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

                        const base = "http://localhost:8000/static/plots";
                        const safeName = lot.name.replace(/ /g, "_");

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

    const handleDownloadPDF = async () => {
        const pdf = new jsPDF("p", "pt", "a4");
        const today = new Date();
        const dateStr = today.toLocaleDateString("tr-TR");

        const adminName = localStorage.getItem("adminName") || "Yönetici";

        // 1. Tüm görselleri önce Promise.all ile sırayla yükle
        const loadedImages = await Promise.all(imageList.map((imgUrl) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => {
                    console.error(`Resim yüklenemedi: ${imgUrl}`);
                    resolve(null);
                };
                img.src = imgUrl;
            });
        }));

        // 2. Her resmi PDF'e ekle
        loadedImages.forEach((img, i) => {
            if (!img) return;
            if (i > 0) pdf.addPage();

            const pageWidth = pdf.internal.pageSize.getWidth();
            const maxImgWidth = pageWidth - 80;
            const imgWidth = maxImgWidth;
            const imgHeight = (img.height * imgWidth) / img.width;

            // Başlık
            pdf.setFontSize(14);
            pdf.text(`Rapor: ${lotName}`, 40, 30);
            pdf.setFontSize(11);
            pdf.text(`Yönetici: ${adminName}`, 40, 50);
            pdf.text(`Tarih: ${dateStr}`, 40, 65);

            // Görsel
            pdf.addImage(img, "PNG", 40, 90, imgWidth, imgHeight);

            // Sayfa numarası
            pdf.setFontSize(10);
            pdf.text(`Sayfa ${i + 1}`, pageWidth - 60, pdf.internal.pageSize.getHeight() - 20);
        });

        const filename = `${lotName} Veri Grafikler - ${dateStr.replace(/\//g, ".")}.pdf`;
        pdf.save(filename);
    };


    if (!lotId || !lotName) return <p>Yükleniyor...</p>;

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>{lotName} - Veri Analizi</h2>

            <button className="custom-button" onClick={handleGeneratePlots}>
                Grafikleri Oluştur
            </button>

            <button className="custom-button" onClick={handleDownloadPDF} style={{ marginLeft: "20px" }}>
                Grafikleri İndir
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
