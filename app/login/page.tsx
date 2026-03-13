"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin() {
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else router.push("/dashboard");
  }

  const inputStyle = { width: "100%", padding: "12px 16px", background: "#1e3b22", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "10px", color: "#f0e6d0", fontSize: "15px", fontFamily: "'Tajawal', sans-serif", outline: "none", direction: "ltr" as const };

  return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'Tajawal', sans-serif" }}>
      <div style={{ background: "#152818", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "20px", padding: "40px", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🌾</div>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: "#f0e6d0", marginBottom: "6px" }}>مرحبا بيك</h1>
          <p style={{ color: "#9ab89a", fontSize: "15px" }}>دخل لحسابك</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ color: "#9ab89a", fontSize: "14px", display: "block", marginBottom: "6px" }}>الإيميل</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@gmail.com" style={inputStyle} />
          </div>
          <div>
            <label style={{ color: "#9ab89a", fontSize: "14px", display: "block", marginBottom: "6px" }}>كلمة السر</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" style={inputStyle} />
          </div>
          {error && <p style={{ color: "#e07040", fontSize: "14px", textAlign: "center" }}>{error}</p>}
          <button onClick={handleLogin} disabled={loading} style={{ background: loading ? "#2a6b42" : "#3d9e66", color: "#fff", padding: "14px", borderRadius: "12px", border: "none", fontSize: "17px", fontWeight: "700", fontFamily: "'Tajawal', sans-serif", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}>
            {loading ? "جاري الدخول..." : "دخول ←"}
          </button>
          <p style={{ textAlign: "center", color: "#9ab89a", fontSize: "14px" }}>
            ماعندكش حساب؟ <Link href="/signup" style={{ color: "#52c47f", textDecoration: "none" }}>سجل مجاناً</Link>
          </p>
        </div>
      </div>
    </main>
  );
}