"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", overflowX: "hidden" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(8,15,9,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(61,158,102,0.15)" : "none",
        padding: "18px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px" }}>🌾</span>
          <span style={{ fontFamily: "'Amiri', serif", fontSize: "22px", color: "#f0e6d0", fontWeight: "700", letterSpacing: "0.5px" }}>فلاحة MA</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {[
            { label: "الحل", href: "/about" },
            { label: "المنهجية", href: "/approach" },
            { label: "الأسعار", href: "/pricing" },
            { label: "الفريق", href: "/team" },
            { label: "تواصل معنا", href: "/contact" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ color: "#9ab89a", fontSize: "15px", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#3d9e66")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ab89a")}>
              {item.label}
            </Link>
          ))}
          <Link href="/login" style={{ background: "#3d9e66", color: "#fff", padding: "10px 24px", borderRadius: "10px", fontSize: "15px", textDecoration: "none", fontWeight: "700" }}>
            دخول
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 48px 80px",
        position: "relative",
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(61,158,102,0.12) 0%, transparent 70%)",
      }}>
        {/* Background grain */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }} />

        {/* Hackathon badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(201,142,82,0.12)", border: "1px solid rgba(201,142,82,0.3)",
          borderRadius: "100px", padding: "8px 20px", marginBottom: "40px",
          color: "#c98e52", fontSize: "13px", fontWeight: "600",
        }}>
          <span>🏆</span>
          <span>مشروع هاكاثون Ramadan'IA — وزارة الانتقال الرقمي وإصلاح الإدارة</span>
        </div>

        <h1 style={{
          fontFamily: "'Amiri', serif",
          fontSize: "clamp(48px, 8vw, 88px)",
          color: "#f0e6d0",
          lineHeight: 1.15,
          marginBottom: "28px",
          maxWidth: "900px",
        }}>
          الزراعة الذكية<br />
          <span style={{ color: "#3d9e66" }}>لكل فلاح مغربي</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "#8aaa8a",
          maxWidth: "620px",
          lineHeight: 1.8,
          marginBottom: "48px",
        }}>
          منصة تستعمل الذكاء الاصطناعي ونماذج FAO العلمية باش تعاون الفلاحين المغاربة يختارو أحسن محصول لأرضهم — بالدارجة، بالصوت، بالصورة.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/signup" style={{
            background: "#3d9e66", color: "#fff", padding: "16px 40px",
            borderRadius: "14px", fontSize: "18px", textDecoration: "none",
            fontWeight: "700", fontFamily: "'Tajawal', sans-serif",
            boxShadow: "0 0 40px rgba(61,158,102,0.3)",
          }}>
            جرب مجاناً ←
          </Link>
          <Link href="/about" style={{
            background: "rgba(61,158,102,0.1)", color: "#9ab89a",
            border: "1px solid rgba(61,158,102,0.25)",
            padding: "16px 40px", borderRadius: "14px", fontSize: "18px",
            textDecoration: "none", fontFamily: "'Tajawal', sans-serif",
          }}>
            اعرف أكثر
          </Link>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", color: "#4a6a4a", fontSize: "22px", animation: "bounce 2s infinite" }}>↓</div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "80px 48px", borderTop: "1px solid rgba(61,158,102,0.1)", borderBottom: "1px solid rgba(61,158,102,0.1)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", textAlign: "center" }}>
          {[
            { num: "9", label: "محاصيل مغربية مُقيَّمة", icon: "🌱" },
            { num: "FAO", label: "نموذج GAEZ v4 العلمي", icon: "🔬" },
            { num: "3", label: "مستويات للمستخدمين", icon: "📊" },
            { num: "∞", label: "أسئلة بالدارجة", icon: "🤖" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: "48px", color: "#3d9e66", fontWeight: "700", lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "#6a8a6a", fontSize: "14px", marginTop: "8px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "42px", color: "#f0e6d0", textAlign: "center", marginBottom: "16px" }}>شنو كيقدم فلاحة MA؟</h2>
          <p style={{ color: "#6a8a6a", textAlign: "center", marginBottom: "64px", fontSize: "16px" }}>كل الأدوات اللي محتاجها الفلاح المغربي في مكان واحد</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { icon: "🌾", title: "ملاءمة المحاصيل", desc: "نموذج FAO الاحترافي كيحسب ملاءمة 9 محاصيل مغربية حسب درجة الحرارة، التربة، والأمطار ديال موقعك.", color: "rgba(61,158,102,0.12)", border: "rgba(61,158,102,0.25)" },
              { icon: "🤖", title: "المستشار الذكي", desc: "اسأل بالدارجة، بالصوت، أو بالصورة. الذكاء الاصطناعي كيجاوبك كخبير زراعي مغربي حقيقي.", color: "rgba(201,142,82,0.08)", border: "rgba(201,142,82,0.2)" },
              { icon: "📍", title: "بيانات موقعك", desc: "الطقس والتربة ديال موقعك بالضبط — من Open-Meteo وSoilGrids — بدون ما تدخل أي معلومة.", color: "rgba(61,158,102,0.08)", border: "rgba(61,158,102,0.2)" },
              { icon: "🗺️", title: "خريطة تفاعلية", desc: "حدد موقع أرضك على الخريطة أو استعمل GPS، وشوف التوصيات فوراً.", color: "rgba(201,142,82,0.08)", border: "rgba(201,142,82,0.2)" },
              { icon: "🔊", title: "واجهة صوتية", desc: "مصمم للفلاح الأمي — كل شيء يقرأ بصوت عالي بالدارجة المغربية.", color: "rgba(61,158,102,0.08)", border: "rgba(61,158,102,0.2)" },
              { icon: "📈", title: "نموذج الكيس (Knapsack)", desc: "يحسب أقل تدخلات ممكنة باش توصل للفئة S1 — ممتاز — بأقل تكلفة.", color: "rgba(201,142,82,0.08)", border: "rgba(201,142,82,0.2)" },
            ].map((f, i) => (
              <div key={i} style={{ background: f.color, border: `1px solid ${f.border}`, borderRadius: "20px", padding: "32px", transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "22px", color: "#f0e6d0", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ color: "#7a9a7a", fontSize: "14px", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "100px 48px",
        background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(61,158,102,0.1) 0%, transparent 70%)",
        textAlign: "center",
        borderTop: "1px solid rgba(61,158,102,0.1)",
      }}>
        <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "48px", color: "#f0e6d0", marginBottom: "20px" }}>جاهز تبدا؟</h2>
        <p style={{ color: "#6a8a6a", fontSize: "18px", marginBottom: "40px" }}>الحساب المجاني كيعطيك كل الميزات الأساسية بدون كارطة بنكية</p>
        <Link href="/signup" style={{
          background: "#3d9e66", color: "#fff", padding: "18px 52px",
          borderRadius: "14px", fontSize: "20px", textDecoration: "none",
          fontWeight: "700", fontFamily: "'Tajawal', sans-serif",
          boxShadow: "0 0 60px rgba(61,158,102,0.25)",
          display: "inline-block",
        }}>
          ابدا مجاناً الآن
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(61,158,102,0.1)", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>🌾</span>
          <span style={{ fontFamily: "'Amiri', serif", color: "#f0e6d0", fontSize: "16px" }}>فلاحة MA</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {[{ label: "الحل", href: "/about" }, { label: "المنهجية", href: "/approach" }, { label: "الأسعار", href: "/pricing" }, { label: "الفريق", href: "/team" }, { label: "تواصل معنا", href: "/contact" }].map(item => (
            <Link key={item.href} href={item.href} style={{ color: "#4a6a4a", fontSize: "13px", textDecoration: "none" }}>{item.label}</Link>
          ))}
        </div>
        <div style={{ color: "#3a5a3a", fontSize: "12px" }}>© 2025 فلاحة MA · هاكاثون Ramadan'IA</div>
      </footer>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
      `}</style>
    </div>
  );
}
