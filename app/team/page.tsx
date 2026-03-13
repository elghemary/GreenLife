"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function TeamPage() {
  const team = [
    {
      name: "فرح الغماري",
      nameEn: "Farah El Ghemary",
      contribution: "تطوير Full-stack، هندسة البنية التقنية، والتواصل",
      contributionEn: "Full-stack development · System architecture · Communication",
      bio: "طالبة سنة أخيرة في الرياضيات والإعلامية القرارية بكلية FSTT. بنات البنية التقنية الكاملة للمشروع — من نموذج FAO وربط APIs للواجهة والذكاء الاصطناعي. مرشدة في مجال الروبوتيك بـ Mindcraft.",
      skills: ["Next.js", "TypeScript", "FAO Modeling", "Claude AI", "Supabase"],
      emoji: "👩‍💻",
      color: "#3d9e66",
    },
    {
      name: "صهيب أحريش",
      nameEn: "Sohayb Ahrich",
      contribution: "تطوير Full-stack",
      contributionEn: "Full-stack development",
      bio: "طالب سنة أولى بمدرسة 1337. أسهم في تطوير الواجهات والميزات التقنية للمنصة.",
      skills: ["Full-stack", "Web Development"],
      emoji: "💻",
      color: "#c98e52",
    },
    {
      name: "محمد أمين جغوطي",
      nameEn: "Mohamed Amine Jaghouti",
      contribution: "دعم التطوير والعرض",
      contributionEn: "Presentation & development support",
      bio: "طالب في السنة الأولى من التحضيري لعلوم الكمبيوتر بمدرسة العلوم التطبيقية، UM6P. أسهم في تطوير المشروع وتقديمه.",
      skills: ["Development Support", "Presentation"],
      emoji: "🎓",
      color: "#9ab89a",
    },
    {
      name: "هاجر اشبني",
      nameEn: "Hajar Ech-chebany",
      contribution: "بحث البيانات والإحصاء",
      contributionEn: "Data research & statistics",
      bio: "طالبة سنة ثالثة في الإحصاء وعلوم البيانات. أسهمت في البحث عن البيانات الزراعية المغربية والمعالجة الإحصائية اللازمة للنموذج.",
      skills: ["Statistics", "Data Research", "Agricultural Data"],
      emoji: "📊",
      color: "#c98e52",
    },
    {
      name: "أيوب",
      nameEn: "Ayoub",
      contribution: "النموذج التجاري",
      contributionEn: "Business model",
      bio: "طالب سنة أولى بمدرسة 1337. مسؤول عن بناء النموذج التجاري للمشروع.",
      skills: ["Business Model"],
      emoji: "📈",
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
              <div style={{ color: member.color, fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>{member.contribution}</div>
              <div style={{ color: "#4a6a4a", fontSize: "12px", marginBottom: "20px" }}>{member.contributionEn}</div>
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
