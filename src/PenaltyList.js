import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";

function PenaltyList() {
  const [penalties, setPenalties] = useState([]);

  useEffect(() => {
    // LocalStorage'dan admin email çek
    const adminEmail = localStorage.getItem("adminEmail");
    if (!adminEmail) {
      console.error("Admin email not found in localStorage!");
      return;
    }

    fetch(`http://localhost:5181/api/Penalties/GetByAdmin/${adminEmail}`)
        .then((response) => response.json())
        .then((data) => setPenalties(data))
        .catch((error) => console.error("API Hatası:", error));
  }, []);

  return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Yazdığınız Cezalar</h2>
        <table style={{ margin: "auto", borderCollapse: "collapse", width: "80%" }}>
          <thead>
          <tr style={{ backgroundColor: "#444", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Plaka</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Sebep</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Ceza Puanı</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Tarih</th>
          </tr>
          </thead>
          <tbody>
          {penalties.map((penalty) => (
              <tr key={penalty.id}>
                <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.plateNumber}</td>
                <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.reason}</td>
                <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.penaltyPoints}</td>
                <td style={{ padding: "10px", border: "1px solid #666" }}>
                  {new Date(penalty.createdAt).toLocaleString()}
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <NavigationButtons />
      </div>
  );
}

export default PenaltyList;
