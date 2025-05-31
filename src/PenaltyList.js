import React from "react";
import NavigationButtons from "./NavigationButtons";

function PenaltyList() {
  const staticPenalties = [
    {
      id: 1,
      plate: "34ABC123",
      reason: "Yetkisiz alana park",
      amount: "250₺",
      date: "2025-05-30",
    },
    {
      id: 2,
      plate: "06XYZ789",
      reason: "Rezervasyon ihlali",
      amount: "150₺",
      date: "2025-05-29",
    },
    {
      id: 3,
      plate: "35MNO456",
      reason: "Otopark süresi aşımı",
      amount: "100₺",
      date: "2025-05-28",
    },
  ];

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Ceza Kayıtları</h2>
      <table style={{ margin: "auto", borderCollapse: "collapse", width: "80%" }}>
        <thead>
          <tr style={{ backgroundColor: "#444", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Plaka</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Sebep</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Tutar</th>
            <th style={{ padding: "10px", border: "1px solid #666" }}>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {staticPenalties.map((penalty) => (
            <tr key={penalty.id}>
              <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.plate}</td>
              <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.reason}</td>
              <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.amount}</td>
              <td style={{ padding: "10px", border: "1px solid #666" }}>{penalty.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <NavigationButtons />
    </div>
  );
}

export default PenaltyList;
