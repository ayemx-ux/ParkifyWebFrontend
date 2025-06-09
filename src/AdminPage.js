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
            const response = await fetch("http://13.51.15.3:5181/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    adminId: 0,
                    name: "",
                    email: username,
                    password: password,
                    lotId: 0,
                }),
            });

            console.log("HTTP durum kodu:", response.status);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("adminName", data.name);
                localStorage.setItem("lotId", data.lot_id);
                console.log("lotId:", localStorage.getItem("lotId"));
                localStorage.setItem("adminEmail", username);


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
            <NavigationButtons />
        </div>
    );
}

export default AdminPage;
