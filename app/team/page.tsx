"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function TeamPage() {
  const team = [
    {
      name: "Farah El Ghemary",
      contribution: "Full-stack development · System architecture · Communication",
      bio: "Final-year student in Mathematics & Decisional Informatics at FSTT & Lead Robotics Mentor at Mindcraft, Built the technical and theorethical aspect of the project, team communication and project direction.",
      skills: ["Next.js", "TypeScript", "FAO Modeling", "Claude AI", "Supabase"],
      photo: "/team/IMG-20260114-WA0001.jpg" as string | null,
      color: "#3d9e66",
    },
    {
      name: "Sohayb Ahrich",
      contribution: "Full-stack development",
      bio: "First-year student at 1337 School. Contributed to frontend development and technical features of the platform.",
      skills: ["Full-stack", "Web Development", "Next.js", "TypeScript"],
      photo: null as string | null, // Add photo path here — e.g. "/team/sohayb.jpg"
      color: "#c98e52",
    },
    {
      name: "Mohamed Amine Jaghouti",
      contribution: "Documentation & Demo",
      bio: "First-year Computer Science Preparatory student at the School of Applied Sciences, UM6P. Contributed to development and project presentation.",
      skills: ["Demo", "Presentation"],
      photo: null as string | null, // Add photo path here — e.g. "/team/amine.jpg"
      color: "#9ab89a",
    },
    {
      name: "Hajar Ech-chebany",
      contribution: "Data research & statistics",
      bio: "Third-year Statistics & Data Science student. Contributed to Moroccan agricultural data research and the statistical processing required for the scoring model.",
      skills: ["Statistics", "Data Research", "Agricultural Data"],
      photo: null as string | null, // Add photo path here — e.g. "/team/hajar.jpg"
      color: "#c98e52",
    },
    {
      name: "Ayoub",
      contribution: "Business model",
      bio: "First-year student at 1337 School. Responsible for building the business model of the project.",
      skills: ["Business Model"],
      photo: null as string | null, // Add photo path here — e.g. "/team/ayoub.jpg"
      color: "#9ab89a",
    },
  ];

  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", minHeight: "100vh" }}>

      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 48px" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", marginBottom: "16px" }}>The Team</h1>
          <p style={{ color: "#6a8a6a", fontSize: "17px" }}>A multidisciplinary team of Moroccan students</p>
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
              {/* Avatar: photo if set, emoji fallback */}
              <div style={{ marginBottom: "16px", display: "flex", justifyContent: "center" }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: "96px", height: "96px", borderRadius: "50%",
                      objectFit: "cover",
                      border: `2px solid ${member.color}`,
                    }}
                  />
                ) : (
                  <div style={{
                    width: "96px", height: "96px", borderRadius: "50%",
                    background: `rgba(${member.color === "#3d9e66" ? "61,158,102" : member.color === "#c98e52" ? "201,142,82" : "154,184,154"},0.15)`,
                    border: `2px solid ${member.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "48px",
                  }}>
                  </div>
                )}
              </div>
              <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "24px", color: "#f0e6d0", marginBottom: "6px" }}>{member.name}</h2>
              <div style={{ color: member.color, fontSize: "13px", fontWeight: "600", marginBottom: "20px" }}>{member.contribution}</div>
              <p style={{ color: "#6a8a6a", fontSize: "13px", lineHeight: 1.8, marginBottom: "20px" }}>{member.bio}</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                {member.skills.map((skill, j) => (
                  <span key={j} style={{ background: "rgba(61,158,102,0.1)", border: "1px solid rgba(61,158,102,0.2)", color: "#5a9a6a", fontSize: "11px", padding: "4px 10px", borderRadius: "100px" }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/contact" style={{ background: "#3d9e66", color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none", fontWeight: "700" }}>
            Contact the team →
          </Link>
        </div>
      </div>
    </div>
  );
}
