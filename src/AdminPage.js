import React, { useState } from "react";
import NavigationButtons from "./NavigationButtons";
import { useNavigate } from "react-router-dom";

function AdminPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5181/api/admin/login", {
        method: "POST",
        headers: {  // header parkingselectionda gerekmiyordu çünkü sadece get veri aldık göndermedik
          "Content-Type": "application/json"
        },
          body: JSON.stringify({
              adminId: 0,
              name: "",
              email: username,
              password: password,
              lotId: 0
          })

      });

<<<<<<< HEAD
      console.log("HTTP durum kodu:", response.status); // Hata ayıklama için log
=======
      console.log("HTTP durum kodu:", response.status); //  Hata ayıklama için log
>>>>>>> 045407a (Son güncellemeler eklendi)



        if (response.ok) {  

        const data = await response.json();
        localStorage.setItem("adminName", data.name);
<<<<<<< HEAD
        localStorage.setItem("lotId", data.lot_id); //Admin adı başka yerlerde görünsün,Hangi otoparkla ilişkili olduğunu hatırlayabilesin.
=======
        localStorage.setItem("lotId", data.lot_id); ////Admin adı başka yerlerde görünsün,Hangi otoparkla ilişkili olduğunu hatırlayabilesin.
>>>>>>> 045407a (Son güncellemeler eklendi)
        console.log("lotId:", localStorage.getItem("lotId"));

            alert(`Hoş geldiniz, ${data.name}!`);
        setIsLoggedIn(true);
        navigate("/admin-dashboard");
      } else if (response.status === 401) {
        alert("Giriş başarısız: Hatalı e-posta veya şifre.");
      } else {
        alert("Bir hata oluştu. Sunucudan beklenmeyen yanıt.");
      }
    } catch (error) {
      console.error("Sunucuya bağlanırken hata:", error);
      alert("Sunucuya bağlanılamadı. Backend çalışıyor mu?");
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
        <NavigationButtons />

      </div>
  );
}

export default AdminPage;