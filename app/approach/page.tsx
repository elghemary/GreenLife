"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function ApproachPage() {
  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>

      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "inline-block", background: "rgba(201,142,82,0.12)", border: "1px solid rgba(201,142,82,0.25)", borderRadius: "100px", padding: "6px 18px", color: "#c98e52", fontSize: "13px", marginBottom: "24px" }}>
            🏆 هاكاثون Ramadan'IA — وزارة الانتقال الرقمي وإصلاح الإدارة
          </div>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", lineHeight: 1.2, marginBottom: "20px" }}>
            المنهجية التقنية
          </h1>
          <p style={{ color: "#7a9a7a", fontSize: "18px", lineHeight: 1.8 }}>
            كيفاش بنينا فلاحة MA — من الفكرة للنشر في أقل من 48 ساعة
          </p>
        </div>

        {/* Hackathon context */}
        <section style={{ marginBottom: "80px", background: "rgba(201,142,82,0.06)", border: "1px solid rgba(201,142,82,0.2)", borderRadius: "20px", padding: "40px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "32px", color: "#c98e52", marginBottom: "20px" }}>🏆 سياق الهاكاثون</h2>
          <p style={{ color: "#8a7a6a", fontSize: "15px", lineHeight: 1.9 }}>
            هاد المشروع تم تطويره في إطار هاكاثون Ramadan'IA، المنظَّم من طرف وزارة الانتقال الرقمي وإصلاح الإدارة — برنامج وطني عبر جهات المملكة خلال رمضان، هدفه تشجيع الابتكار في الذكاء الاصطناعي. التحدي: بناء حل رقمي مبتكر يساعد الفلاح الصغير في اتخاذ القرار الزراعي — في وقت قصير، بموارد محدودة، لمستخدم قد لا يعرف القراءة.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "28px" }}>
            {[
              { label: "مدة التطوير", val: "48 ساعة" },
              { label: "حجم الفريق", val: "طالبة FSTT" },
              { label: "الهدف", val: "الفلاح الصغير" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", background: "rgba(201,142,82,0.08)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontFamily: "'Amiri', serif", fontSize: "24px", color: "#c98e52", marginBottom: "6px" }}>{s.val}</div>
                <div style={{ color: "#6a5a4a", fontSize: "13px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#f0e6d0", marginBottom: "32px" }}>🏗️ البنية التقنية</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { layer: "الواجهة", tech: "Next.js 15 + TypeScript", desc: "تطبيق ويب RTL كامل بدعم للعربية والموبايل" },
              { layer: "الخرائط", tech: "Leaflet.js + GPS", desc: "تحديد الموقع التلقائي أو اليدوي على الخريطة" },
              { layer: "بيانات الطقس", tech: "Open-Meteo API", desc: "درجة الحرارة المتوسطة والأمطار السنوية المجانية" },
              { layer: "بيانات التربة", tech: "SoilGrids v2.0", desc: "قيمة pH للتربة من عمق 0-5 سم بدقة 250m" },
              { layer: "نموذج الملاءمة", tech: "FAO GAEZ v4 (TypeScript)", desc: "دالة احترافية شبه منحرفة لـ 9 محاصيل مغربية" },
              { layer: "الذكاء الاصطناعي", tech: "Claude claude-sonnet-4-20250514 API", desc: "مستشار زراعي بالدارجة مع دعم الصور والتاريخ الكامل" },
              { layer: "الصوت", tech: "ElevenLabs API + Web Speech API", desc: "TTS عربي احترافي وSTT للإدخال الصوتي" },
              { layer: "قاعدة البيانات", tech: "Supabase (PostgreSQL)", desc: "مصادقة المستخدمين وتخزين البيانات" },
              { layer: "النشر", tech: "Vercel", desc: "نشر تلقائي من GitHub مع Edge Functions" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", background: "rgba(61,158,102,0.05)", border: "1px solid rgba(61,158,102,0.12)", borderRadius: "12px", padding: "20px 24px", alignItems: "center" }}>
                <div style={{ background: "rgba(61,158,102,0.15)", borderRadius: "8px", padding: "6px 12px", color: "#3d9e66", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap", minWidth: "80px", textAlign: "center" }}>{item.layer}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#c98e52", fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>{item.tech}</div>
                  <div style={{ color: "#5a7a5a", fontSize: "13px" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Knapsack */}
        <section style={{ marginBottom: "80px", background: "rgba(61,158,102,0.05)", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "20px", padding: "40px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "32px", color: "#3d9e66", marginBottom: "20px" }}>🎒 الإسهام العلمي: نموذج الكيس</h2>
          <p style={{ color: "#6a9a7a", fontSize: "15px", lineHeight: 1.9, marginBottom: "24px" }}>
            الإضافة العلمية الأصيلة في فلاحة MA هي إعادة صياغة مشكلة الزراعة كـ<strong style={{ color: "#f0e6d0" }}> مسألة تحسين قيود (Constrained Optimization)</strong>:
          </p>
          <div style={{ background: "#0a1a0c", borderRadius: "12px", padding: "24px", fontFamily: "monospace", fontSize: "14px", color: "#9ab89a", lineHeight: 2, marginBottom: "24px" }}>
            <div style={{ color: "#c98e52" }}>// هدف: الوصول للفئة S1 بأقل تكلفة</div>
            <div><span style={{ color: "#3d9e66" }}>minimize</span>: Σ cost(intervention_i)</div>
            <div><span style={{ color: "#3d9e66" }}>subject to</span>: score(x + interventions) ≥ 0.80</div>
            <div style={{ marginTop: "8px", color: "#c98e52" }}>// التدخلات الممكنة</div>
            <div>pH_correction: جير زراعي (+0.5 pH / هكتار)</div>
            <div>irrigation: نظام تقطير (7000 م³/هكتار)</div>
            <div>fertilizer: سماد NPK محسوب</div>
          </div>
          <p style={{ color: "#5a7a5a", fontSize: "13px", lineHeight: 1.8 }}>
            هاد النموذج كيعطي الفلاح ليست بأرخص التدخلات الزراعية الضرورية باش يحقق أحسن تصنيف — بدل ما يقول "أرضك ما مزيانةش"، كيقول "هاك 3 أشياء باغي تدير وهاد هي التكلفة".
          </p>
        </section>

        {/* Roadmap */}
        <section style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#f0e6d0", marginBottom: "32px" }}>🗺️ خارطة الطريق</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { phase: "المرحلة 1 ✅", title: "النموذج الأولي", desc: "نموذج FAO + الذكاء الاصطناعي + الخريطة — مكتمل", done: true },
              { phase: "المرحلة 2 🔄", title: "التحسينات", desc: "بيانات الأمطار الدقيقة، رفع الصور، الصوت الاحترافي", done: false },
              { phase: "المرحلة 3 ⏳", title: "نموذج LSTM", desc: "توقعات زراعية بالتعلم الآلي بناءً على بيانات ONCA", done: false },
              { phase: "المرحلة 4 ⏳", title: "شراكة حكومية", desc: "ربط مع بيانات وزارة الانتقال الرقمي وONCA وCRDA", done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", paddingBottom: "32px", position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: item.done ? "#3d9e66" : "rgba(61,158,102,0.15)", border: `2px solid ${item.done ? "#3d9e66" : "rgba(61,158,102,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: item.done ? "#fff" : "#3d9e66", fontWeight: "700", fontSize: "14px", flexShrink: 0 }}>{i + 1}</div>
                  {i < 3 && <div style={{ width: "2px", flex: 1, background: "rgba(61,158,102,0.15)", marginTop: "4px" }} />}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  <div style={{ color: "#c98e52", fontSize: "12px", marginBottom: "4px" }}>{item.phase}</div>
                  <h3 style={{ color: "#f0e6d0", fontSize: "17px", marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "#5a7a5a", fontSize: "14px" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/pricing" style={{ background: "#3d9e66", color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none", fontWeight: "700" }}>الأسعار ←</Link>
          <Link href="/team" style={{ background: "rgba(61,158,102,0.1)", color: "#9ab89a", border: "1px solid rgba(61,158,102,0.25)", padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none" }}>الفريق</Link>
        </div>
      </div>
    </div>
  );
}
