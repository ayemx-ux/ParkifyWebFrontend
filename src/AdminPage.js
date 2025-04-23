import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için

function AdminPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router kullanarak yönlendirme

  // Giriş formu gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun sayfayı yenilemesini engeller

    try {
      const response = await fetch("https://localhost:5001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("lotId", data.lot_id); // Oturum için lotId'yi sakla
        alert(`Hoş geldiniz, ${data.name}!`);
        setIsLoggedIn(true); // Giriş yapıldığında butonları gizlemek için state güncellenir
        navigate("/admin-dashboard"); // Yönetici için özel dashboard sayfasına yönlendir
      } else if (response.status === 401) {
        alert("Giriş başarısız: Hatalı kullanıcı adı veya şifre.");
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Yönetici Girişi Sayfası</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yönetici E-Posta"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "200px"
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Yönetici Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "200px"
          }}
        />
        <br />
        <button type="submit" className="custom-button">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
