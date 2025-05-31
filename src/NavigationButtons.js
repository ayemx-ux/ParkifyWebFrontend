import React from "react";
import { useNavigate } from "react-router-dom";

function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "20px" }}>
      <button className="custom-button" onClick={() => navigate(-1)}>
        ⬅️ Geri
      </button>
      <button className="custom-button" onClick={() => navigate("/")}>
        🏠 Ana Sayfa
      </button>
    </div>
  );
}

export default NavigationButtons;

