import React, { useEffect, useState } from "react";

function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [penaltyData, setPenaltyData] = useState({});

  useEffect(() => {
    const lotId = localStorage.getItem("lotId");
    if (!lotId) {
      console.error("lotId not found in localStorage!");
      return;
    }

    fetch(`http://localhost:5181/api/Complaints/GetByLot/${lotId}`)
        .then((response) => response.json())
        .then((data) => setComplaints(data))
        .catch((error) => console.error("API Hatası:", error));
  }, []);

  const handlePenaltyApprove = (complaintId) => {
    const adminEmail = localStorage.getItem("adminEmail");
    const { plateNumber, reason, penaltyPoints } = penaltyData[complaintId] || {};

    if (!plateNumber || !reason || !penaltyPoints) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const penaltyRequest = {
      complaintId,
      adminEmail,
      plateNumber,
      reason,
      penaltyPoints: parseInt(penaltyPoints),
    };

    // 🚀 1️⃣ Ceza ver
    fetch("http://localhost:5181/api/Penalties/Issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(penaltyRequest),
    })
        .then((response) => {
          if (response.ok) {
            // 🚀 2️⃣ Şikayeti resolved yap
            fetch(`http://localhost:5181/api/Complaints/MarkAsResolved?complaintId=${complaintId}&adminEmail=${adminEmail}`, {
              method: "PUT",
            })
                .then((res) => {
                  if (res.ok) {
                    // 🚀 UI'da durumu "Resolved" yap
                    setComplaints((prev) =>
                        prev.map((c) =>
                            c.id === complaintId ? { ...c, status: "Resolved" } : c
                        )
                    );
                    alert("Ceza verildi ve şikayet resolved oldu!");
                  } else {
                    alert("Ceza verildi ama şikayet resolved yapılamadı!");
                  }
                })
                .catch((error) => console.error("Resolved API Hatası:", error));
          } else {
            alert("Ceza verme başarısız.");
          }
        })
        .catch((error) => console.error("Ceza API Hatası:", error));
  };

  const handleInputChange = (complaintId, field, value) => {
    setPenaltyData((prev) => ({
      ...prev,
      [complaintId]: {
        ...prev[complaintId],
        [field]: value,
      },
    }));
  };

  return (
      <div className="app-container">
        <h2 className="header">Şikayetler</h2>

        {complaints.map((complaint) => {
          const isResolved = complaint.status === "Resolved";
          return (
              <div key={complaint.id} style={styles.cardContainer}>
                <div style={styles.imageWrapper}>
                  <img
                      src={`http://localhost:5181/${complaint.imagePath}`}
                      alt="Plaka"
                      style={styles.image}
                  />
                </div>

                <div style={styles.infoSection}>
                  <p><strong>Kullanıcı E-Posta:</strong> {complaint.userEmail}</p>
                  <label>Plaka:</label>
                  <input
                      type="text"
                      value={penaltyData[complaint.id]?.plateNumber || complaint.licensePlateDetected || ""}
                      onChange={(e) => handleInputChange(complaint.id, "plateNumber", e.target.value)}
                      disabled={isResolved}
                  />
                  <label>Ceza Nedeni:</label>
                  <input
                      type="text"
                      value={penaltyData[complaint.id]?.reason || ""}
                      onChange={(e) => handleInputChange(complaint.id, "reason", e.target.value)}
                      disabled={isResolved}
                  />
                  <label>Ceza Puanı:</label>
                  <input
                      type="number"
                      value={penaltyData[complaint.id]?.penaltyPoints || ""}
                      onChange={(e) => handleInputChange(complaint.id, "penaltyPoints", e.target.value)}
                      disabled={isResolved}
                  />

                  <p><strong>Alan:</strong> {complaint.spaceNumber}</p>
                  <p><strong>Tarih:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
                  <p><strong>Durum:</strong> {isResolved ? "Resolved" : complaint.status}</p>

                  {!isResolved && (
                      <button
                          className="custom-button"
                          onClick={() => handlePenaltyApprove(complaint.id)}
                      >
                        ✅ Onayla ve Ceza Ver
                      </button>
                  )}
                </div>
              </div>
          );
        })}
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
