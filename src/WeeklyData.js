import React from "react";

function WeeklyData() {
  // Statik haftalık veriler (örnek)
  const weeklyData = {
    Monday: { status: "Dolu" },
    Tuesday: { status: "Boş" },
    Wednesday: { status: "Rezervasyon" },
    Thursday: { status: "Dolu" },
    Friday: { status: "Boş" },
    Saturday: { status: "Dolu" },
    Sunday: { status: "Boş" },
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Haftalık Otopark Verileri</h2>
      <div>
        <h3>Otopark Durumları</h3>
        {Object.keys(weeklyData).map((day) => (
          <div key={day}>
            <p>
              {day}: {weeklyData[day].status}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3>Veri Analizi:</h3>
        <p>Otoparkınızın en yoğun zamanı Cumartesi günleri saat 11:00 - 12:00 arası.</p>
      </div>
    </div>
  );
}

export default WeeklyData;
