import React, { useState } from "react";

const initialComplaints = [
  {
    email: "kullanici1@example.com",
    plate: "34ABC123",
    penaltyReason: "",
    penaltyPoint: "",
    imageUrl: "https://via.placeholder.com/200x120?text=PLAKA",
  },
  {
    email: "kullanici2@example.com",
    plate: "06XYZ789",
    penaltyReason: "",
    penaltyPoint: "",
    imageUrl: "https://via.placeholder.com/200x120?text=PLAKA",
  },
];

function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);

  const updateField = (index, field, value) => {
    const updated = [...complaints];
    updated[index][field] = value;
    setComplaints(updated);
  };

  const handleApprove = (index) => {
    const data = complaints[index];
    alert(`Ceza onaylandı:\nPlaka: ${data.plate}\nNeden: ${data.penaltyReason}\nPuan: ${data.penaltyPoint}`);
  };

  return (
    <div className="app-container">
      <h2 className="header">Şikayetler</h2>

      {complaints.map((complaint, index) => (
        <div key={index} style={styles.cardContainer}>
          {/* Sol taraf - Görsel */}
          <div style={styles.imageWrapper}>
            <img src={complaint.imageUrl} alt="Plaka" style={styles.image} />
          </div>

          {/* Sağ taraf - Bilgiler */}
          <div style={styles.infoSection}>
            <p><strong>Kullanıcı E-Posta:</strong> {complaint.email}</p>

            <label>Plaka:</label>
            <input
              type="text"
              value={complaint.plate}
              onChange={(e) => updateField(index, "plate", e.target.value)}
            />

            <label>Ceza Nedeni:</label>
            <input
              type="text"
              placeholder="Ceza nedenini yazın"
              value={complaint.penaltyReason}
              onChange={(e) => updateField(index, "penaltyReason", e.target.value)}
            />

            <label>Ceza Puanı:</label>
            <input
              type="number"
              placeholder="Ceza puanı"
              value={complaint.penaltyPoint}
              onChange={(e) => updateField(index, "penaltyPoint", e.target.value)}
            />

            <button className="custom-button" onClick={() => handleApprove(index)}>
              ✅ Ceza Onayla
            </button>
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
