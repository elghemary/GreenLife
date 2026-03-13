"use client";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    const mailtoLink = `mailto:elghemary@gmail.com?subject=${encodeURIComponent(form.subject || "رسالة من موقع فلاحة MA")}&body=${encodeURIComponent(`الاسم: ${form.name}\nالبريد: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
  }

  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>

      <Navbar />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", marginBottom: "16px" }}>تواصل معنا</h1>
          <p style={{ color: "#6a8a6a", fontSize: "17px" }}>سؤال؟ اقتراح؟ شراكة؟ نتشرفو بسماعك</p>
        </div>

        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { icon: "📧", label: "البريد الإلكتروني", val: "filaha.ma.contact@gmail.com" },
            { icon: "🏫", label: "الجامعة", val: "FSTT — طنجة، المغرب" },
            { icon: "🏆", label: "الهاكاثون", val: "Ramadan'IA — وزارة الانتقال الرقمي" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(61,158,102,0.05)", border: "1px solid rgba(61,158,102,0.12)", borderRadius: "14px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
              <div style={{ color: "#4a6a4a", fontSize: "12px", marginBottom: "4px" }}>{item.label}</div>
              <div style={{ color: "#9ab89a", fontSize: "13px" }}>{item.val}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {sent ? (
          <div style={{ textAlign: "center", background: "rgba(61,158,102,0.08)", border: "1px solid rgba(61,158,102,0.25)", borderRadius: "20px", padding: "48px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: "#f0e6d0", marginBottom: "12px" }}>شكراً على رسالتك!</h2>
            <p style={{ color: "#6a8a6a" }}>فتح تطبيق البريد الإلكتروني ديالك — أرسل الرسالة من هناك.</p>
            <button onClick={() => setSent(false)} style={{ marginTop: "24px", background: "transparent", border: "1px solid rgba(61,158,102,0.3)", color: "#9ab89a", padding: "10px 24px", borderRadius: "8px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif", fontSize: "14px" }}>
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <div style={{ background: "rgba(61,158,102,0.04)", border: "1px solid rgba(61,158,102,0.15)", borderRadius: "24px", padding: "40px" }}>
            <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: "#f0e6d0", marginBottom: "28px" }}>أرسل رسالة</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              {[
                { key: "name", label: "الاسم *", placeholder: "اسمك الكامل" },
                { key: "email", label: "البريد الإلكتروني *", placeholder: "example@gmail.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ display: "block", color: "#6a8a6a", fontSize: "13px", marginBottom: "8px" }}>{field.label}</label>
                  <input
                    type={field.key === "email" ? "email" : "text"}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    style={{ width: "100%", background: "#0d1f10", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "10px", padding: "12px 16px", color: "#f0e6d0", fontSize: "14px", fontFamily: "'Tajawal', sans-serif", direction: "rtl", boxSizing: "border-box", outline: "none" }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", color: "#6a8a6a", fontSize: "13px", marginBottom: "8px" }}>الموضوع</label>
              <input
                placeholder="موضوع رسالتك"
                value={form.subject}
                onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                style={{ width: "100%", background: "#0d1f10", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "10px", padding: "12px 16px", color: "#f0e6d0", fontSize: "14px", fontFamily: "'Tajawal', sans-serif", direction: "rtl", boxSizing: "border-box", outline: "none" }}
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", color: "#6a8a6a", fontSize: "13px", marginBottom: "8px" }}>الرسالة *</label>
              <textarea
                placeholder="اكتب رسالتك هنا..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                rows={5}
                style={{ width: "100%", background: "#0d1f10", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "10px", padding: "12px 16px", color: "#f0e6d0", fontSize: "14px", fontFamily: "'Tajawal', sans-serif", direction: "rtl", boxSizing: "border-box", outline: "none", resize: "vertical" }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.email || !form.message}
              style={{
                width: "100%", background: !form.name || !form.email || !form.message ? "#1a3a1e" : "#3d9e66",
                color: "#fff", border: "none", borderRadius: "12px", padding: "16px",
                fontSize: "17px", fontWeight: "700", fontFamily: "'Tajawal', sans-serif",
                cursor: !form.name || !form.email || !form.message ? "not-allowed" : "pointer",
              }}
            >
              إرسال الرسالة ←
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
