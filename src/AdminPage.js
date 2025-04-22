import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Yönlendirme için

function AdminPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router kullanarak yönlendirme

  // Giriş formu gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();  // Formun sayfayı yenilemesini engeller

    console.log("Admin giriş formu gönderildi!");  // Form gönderildiğini kontrol et

    // Basit bir doğrulama (örneğin, sabit bir yönetici kullanıcı adı ve şifre)
    if (username === "admin" && password === "admin123") {
      // Başarıyla giriş yaptıysa kullanıcıyı dashboard sayfasına yönlendir
      alert("Yönetici girişi başarılı!");
      setIsLoggedIn(true); // Giriş yapıldığında butonları gizlemek için state güncelliyoruz
      navigate("/admin-dashboard"); // Yönetici için özel dashboard sayfasına yönlendir
    } else {
      alert("Yönetici kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Yönetici Girişi Sayfası</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Yönetici Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "10px",
            width: "200px",
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
            width: "200px",
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
