import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh", background: "#0b1c0d", color: "#ddeadc",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center", padding: "40px",
      fontFamily: "'Tajawal', sans-serif"
    }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌾</div>
      <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "48px", color: "#f0e6d0", marginBottom: "16px" }}>
        فلاحة MA
      </h1>
      <p style={{ fontSize: "18px", color: "#9ab89a", marginBottom: "40px" }}>مستشارك الزراعي الذكي</p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/login" style={{ background: "#3d9e66", color: "#fff", padding: "14px 32px", borderRadius: "12px", textDecoration: "none", fontSize: "17px", fontWeight: "700" }}>دخول</Link>
        <Link href="/signup" style={{ border: "1px solid rgba(61,158,102,0.4)", color: "#f0e6d0", padding: "14px 32px", borderRadius: "12px", textDecoration: "none", fontSize: "17px", fontWeight: "700" }}>حساب جديد</Link>
      </div>
    </main>
  );
}