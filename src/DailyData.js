import React from "react";

function DailyData() {
  // Statik günlük veriler (örnek)
  const dailyData = {
    Monday: { hour: "08:00 - 09:00", status: "Dolu" },
    Tuesday: { hour: "14:00 - 15:00", status: "Boş" },
    Wednesday: { hour: "09:00 - 10:00", status: "Rezervasyon" },
    Thursday: { hour: "11:00 - 12:00", status: "Dolu" },
    Friday: { hour: "16:00 - 17:00", status: "Boş" },
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Günlük Otopark Verileri</h2>
      <div>
        <h3>Otopark Durumları</h3>
        {Object.keys(dailyData).map((day) => (
          <div key={day}>
            <p>
              {day}: {dailyData[day].hour} - Durum: {dailyData[day].status}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3>Veri Analizi:</h3>
        <p>Otoparkınızın en dolu zamanı Pazartesi-Cuma günleri saat 08:00 - 09:00 arası.</p>
      </div>
    </div>
  );
}

export default DailyData;
