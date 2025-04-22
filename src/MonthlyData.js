import React from "react";

function MonthlyData() {
  // Statik aylık veriler (örnek)
  const monthlyData = {
    "Week 1": { occupancyRate: "70%" },
    "Week 2": { occupancyRate: "80%" },
    "Week 3": { occupancyRate: "65%" },
    "Week 4": { occupancyRate: "90%" },
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Aylık Otopark Verileri</h2>
      <div>
        <h3>Otopark Doluluk Oranları</h3>
        {Object.keys(monthlyData).map((week) => (
          <div key={week}>
            <p>
              {week}: Doluluk Oranı: {monthlyData[week].occupancyRate}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3>Veri Analizi:</h3>
        <p>Otoparkınızın en dolu olduğu hafta: 4. Hafta (%90 doluluk).</p>
      </div>
    </div>
  );
}

export default MonthlyData;
