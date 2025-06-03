import React, { useEffect, useState } from "react";

function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // localStorage'dan lotId'yi al
    const lotId = localStorage.getItem("lotId");
    if (!lotId) {
      console.error("lotId not found in localStorage!");
      return;
    }

    // Şikayetleri API'den al
    fetch(`http://localhost:5181/api/Complaints/GetByLot/${lotId}`)
        .then((response) => response.json())
        .then((data) => setComplaints(data))
        .catch((error) => console.error("API Hatası:", error));
  }, []);

  // Şikayeti çözümle
  const handleApprove = (complaintId) => {
    const adminEmail = localStorage.getItem("adminEmail");
    fetch(`http://localhost:5181/api/Complaints/MarkAsResolved?complaintId=${complaintId}&adminEmail=${adminEmail}`, {
      method: "PUT",
    })
        .then((response) => {
          if (response.ok) {
            alert("Şikayet çözüldü olarak işaretlendi.");
            window.location.reload();
          } else {
            alert("Şikayet çözümleme başarısız.");
          }
        })
        .catch((error) => console.error("API Hatası:", error));
  };

  return (
      <div className="app-container">
        <h2 className="header">Şikayetler</h2>

        {complaints.map((complaint) => (
            <div key={complaint.id} style={styles.cardContainer}>
              {/* Sol taraf - Görsel */}
              <div style={styles.imageWrapper}>
                <img
                    src={`http://localhost:5181/${complaint.imagePath}`}
                    alt="Plaka"
                    style={styles.image}
                />
              </div>

              {/* Sağ taraf - Bilgiler */}
              <div style={styles.infoSection}>
                <p><strong>Kullanıcı E-Posta:</strong> {complaint.userEmail}</p>
                <p><strong>Plaka:</strong> {complaint.licensePlateDetected}</p>
                <p><strong>Alan:</strong> {complaint.spaceNumber}</p>
                <p><strong>Tarih:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                <p><strong>Durum:</strong> {complaint.status}</p>

                {complaint.status === "Pending" && (
                    <button
                        className="custom-button"
                        onClick={() => handleApprove(complaint.id)}
                    >
                      ✅ Şikayeti Çöz
                    </button>
                )}
              </div>
            </div>
        ))}
      </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    gap: "30px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #444",
    borderRadius: "10px",
    maxWidth: "900px",
    backgroundColor: "#1c1c1c",
    textAlign: "left",
  },
  imageWrapper: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "220px",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  infoSection: {
    flex: "2",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default ComplaintsDashboard;
