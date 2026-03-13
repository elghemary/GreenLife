"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState(33.897);
  const [lon, setLon] = useState(-5.554);
  const [locationName, setLocationName] = useState("مكناس");
  const [gpsLoading, setGpsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
      else { setUser(user); setLoading(false); autoGPS(); }
    }
    getUser();
  }, []);

  async function autoGPS() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLat(pos.coords.latitude); setLon(pos.coords.longitude);
      await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
    });
  }

  async function handleGPS() {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setLat(pos.coords.latitude); setLon(pos.coords.longitude);
      await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      setGpsLoading(false);
    }, () => { setGpsLoading(false); alert("ما قدرناش نوصلو للـ GPS."); });
  }

  async function reverseGeocode(lat: number, lon: number) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ar`);
      const data = await res.json();
      setLocationName(data.address?.city || data.address?.town || data.address?.village || "موقعك");
    } catch { setLocationName("موقعك"); }
  }

  async function handleLogout() { await supabase.auth.signOut(); router.push("/login"); }

  if (loading) return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", color: "#9ab89a", fontSize: "18px" }}>
      جاري التحميل...
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", fontFamily: "'Tajawal', sans-serif", color: "#ddeadc" }}>
      <nav style={{ background: "#112214", borderBottom: "1px solid rgba(61,158,102,0.2)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🌾</span>
          <span style={{ fontFamily: "'Amiri', serif", fontSize: "20px", color: "#f0e6d0", fontWeight: "700" }}>فلاحة MA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#9ab89a", fontSize: "14px" }}>{user?.email}</span>
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid rgba(61,158,102,0.3)", color: "#9ab89a", padding: "7px 16px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif", fontSize: "14px" }}>خروج</button>
        </div>
      </nav>

      <div style={{ padding: "40px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#f0e6d0", marginBottom: "8px" }}>مرحبا بيك 👋</h1>
        <p style={{ color: "#9ab89a", fontSize: "16px", marginBottom: "40px" }}>حدد موقع أرضك وشوف التوصيات الزراعية</p>

        <div style={{ background: "#152818", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "20px", padding: "28px", marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#f0e6d0", marginBottom: "4px" }}>📍 موقع أرضك</div>
              <div style={{ fontSize: "14px", color: "#9ab89a" }}>{locationName} · {lat.toFixed(4)}°N, {lon.toFixed(4)}°E</div>
            </div>
            <button onClick={handleGPS} disabled={gpsLoading} style={{ background: gpsLoading ? "#2a6b42" : "#3d9e66", color: "#fff", padding: "10px 20px", borderRadius: "10px", border: "none", fontSize: "15px", fontWeight: "700", fontFamily: "'Tajawal', sans-serif", cursor: gpsLoading ? "not-allowed" : "pointer" }}>
              {gpsLoading ? "جاري التحديد..." : "📡 GPS — حدد موقعي"}
            </button>
          </div>
          <MapPicker lat={lat} lon={lon} onChange={(newLat, newLon) => { setLat(newLat); setLon(newLon); reverseGeocode(newLat, newLon); }} />
          <p style={{ marginTop: "12px", fontSize: "13px", color: "#6a8a6a", textAlign: "center" }}>ضغط على الخريطة أو سحب الدبوس باش تحدد موقع أرضك بالضبط</p>
        </div>
        <a href={`/dashboard/scoring?lat=${lat}&lon=${lon}`} style={{ textDecoration: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { icon: "🌾", title: "ملاءمة المحاصيل", desc: "9 محاصيل مغربية مُقيَّمة", color: "rgba(201,142,82,0.15)" },
            { icon: "⛅", title: "الطقس", desc: "توقعات 7 أيام لموقعك", color: "rgba(61,120,180,0.15)" },
            { icon: "🪨", title: "تحليل التربة", desc: "pH، NPK لموقعك", color: "rgba(100,80,40,0.2)" },
            { icon: "🤖", title: "المستشار الذكي", desc: "اسأل بالدارجة", color: "rgba(120,61,158,0.15)" },
          ].map((card, i) => (
            <div key={i} style={{ background: "#152818", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "16px", padding: "24px", cursor: "pointer" }}>
              <div style={{ width: "48px", height: "48px", background: card.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "14px" }}>{card.icon}</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#f0e6d0", marginBottom: "4px" }}>{card.title}</div>
              <div style={{ fontSize: "13px", color: "#9ab89a" }}>{card.desc}</div>
            </div>
          ))}
        </div>
        </a>
      </div>
    </main>
  );
}