"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function TeamPage() {
  const team = [
    {
      name: "فرح",
      role: "مطورة رئيسية ومهندسة النماذج",
      roleEn: "Lead Developer & Model Engineer",
      bio: "طالبة في برنامج الرياضيات التطبيقية (MIP) بكلية FSTT. متخصصة في نمذجة البيانات الزراعية وتطوير الويب. مسؤولة عن بناء نموذج FAO، البنية التقنية الكاملة، والذكاء الاصطناعي.",
      skills: ["Next.js", "TypeScript", "FAO Modeling", "Claude AI", "Supabase"],
      emoji: "👩‍💻",
      color: "#3d9e66",
    },
    {
      name: "عضو الفريق 2",
      role: "تحليل البيانات الزراعية",
      roleEn: "Agricultural Data Analyst",
      bio: "مختص في تحليل بيانات التربة والمناخ وترجمتها لتوصيات زراعية عملية.",
      skills: ["Data Analysis", "GIS", "Soil Science"],
      emoji: "🌱",
      color: "#c98e52",
    },
    {
      name: "عضو الفريق 3",
      role: "تصميم تجربة المستخدم",
      roleEn: "UX Designer",
      bio: "مصمم متخصص في واجهات المستخدم للمجتمعات الريفية وضمان إمكانية الوصول.",
      skills: ["UI/UX", "Accessibility", "Figma"],
      emoji: "🎨",
      color: "#9ab89a",
    },
  ];

  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>

      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 48px" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", marginBottom: "16px" }}>الفريق</h1>
          <p style={{ color: "#6a8a6a", fontSize: "17px" }}>فريق متعدد التخصصات من طلاب الجامعة المغربية</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", marginBottom: "80px" }}>
          {team.map((member, i) => (
            <div key={i} style={{
              background: `rgba(${member.color === "#3d9e66" ? "61,158,102" : member.color === "#c98e52" ? "201,142,82" : "154,184,154"},0.05)`,
              border: `1px solid ${member.color === "#3d9e66" ? "rgba(61,158,102,0.25)" : member.color === "#c98e52" ? "rgba(201,142,82,0.25)" : "rgba(154,184,154,0.2)"}`,
              borderRadius: "24px",
              padding: "36px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "64px", marginBottom: "16px" }}>{member.emoji}</div>
              <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "26px", color: "#f0e6d0", marginBottom: "4px" }}>{member.name}</h2>
              <div style={{ color: member.color, fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>{member.role}</div>
              <div style={{ color: "#4a6a4a", fontSize: "12px", marginBottom: "20px" }}>{member.roleEn}</div>
              <p style={{ color: "#6a8a6a", fontSize: "13px", lineHeight: 1.8, marginBottom: "20px" }}>{member.bio}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                {member.skills.map((skill, j) => (
                  <span key={j} style={{ background: "rgba(61,158,102,0.1)", border: "1px solid rgba(61,158,102,0.2)", color: "#5a9a6a", fontSize: "11px", padding: "4px 10px", borderRadius: "100px" }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Institution */}
        <div style={{ background: "rgba(201,142,82,0.06)", border: "1px solid rgba(201,142,82,0.2)", borderRadius: "20px", padding: "40px", textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎓</div>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: "#c98e52", marginBottom: "12px" }}>كلية العلوم والتقنيات طنجة (FSTT)</h2>
          <p style={{ color: "#7a6a5a", fontSize: "14px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
            هاد المشروع تم تطويره في إطار برنامج الرياضيات التطبيقية والصناعية (MIP) بكلية FSTT، جامعة عبد المالك السعدي، طنجة — المغرب.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/contact" style={{ background: "#3d9e66", color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none", fontWeight: "700" }}>
            تواصل مع الفريق ←
          </Link>
        </div>
      </div>
    </div>
  );
}
