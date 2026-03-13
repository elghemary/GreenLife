"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function AboutPage() {
  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>
      
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "inline-block", background: "rgba(61,158,102,0.12)", border: "1px solid rgba(61,158,102,0.25)", borderRadius: "100px", padding: "6px 18px", color: "#3d9e66", fontSize: "13px", marginBottom: "24px" }}>
            المشكلة والحل
          </div>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", lineHeight: 1.2, marginBottom: "20px" }}>
            لماذا GreenLife؟
          </h1>
          <p style={{ color: "#7a9a7a", fontSize: "18px", lineHeight: 1.8 }}>
            المغرب بلد زراعي — الفلاحة كتمثل 14٪ من الناتج الداخلي الخام وتشغل أكثر من 40٪ من اليد العاملة. لكن الفلاح الصغير غالباً كيختار محصوله بناءً على التجربة والحدس، بدون أي بيانات علمية.
          </p>
        </div>

        {/* Problem */}
        <section style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#c98e52", marginBottom: "32px" }}>🔴 المشكلة</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {[
              { title: "غياب المعلومة الزراعية", desc: "أكثر من 1.5 مليون استغلالية صغيرة في المغرب ما عندهاش وصول لبيانات التربة والمناخ الخاصة بموقعها." },
              { title: "الأمية والحاجز الرقمي", desc: "نسبة كبيرة من الفلاحين ما كيقراوش، مما يجعل التطبيقات التقليدية عديمة الفائدة بالنسبة ليهم." },
              { title: "خسائر اقتصادية", desc: "اختيار المحصول الخاطئ كيكلف الفلاح موسماً كاملاً من العمل والمال — وغالباً ما عندوش احتياطي للتعويض." },
              { title: "التغير المناخي", desc: "أنماط الأمطار والحرارة كتتغير بسرعة في المغرب، والتجربة القديمة ما بقاتش كافية." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,60,60,0.05)", border: "1px solid rgba(255,60,60,0.15)", borderRadius: "16px", padding: "24px 28px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(255,60,60,0.15)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#ff6b6b", fontWeight: "700" }}>{i + 1}</div>
                <div>
                  <h3 style={{ color: "#f0e6d0", fontSize: "17px", marginBottom: "6px" }}>{item.title}</h3>
                  <p style={{ color: "#7a7a7a", fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#3d9e66", marginBottom: "32px" }}>🟢 الحل</h2>
          <p style={{ color: "#7a9a7a", fontSize: "16px", lineHeight: 1.9, marginBottom: "32px" }}>
            GreenLife كتجمع بيانات علمية حقيقية (الطقس، التربة، الموقع) مع نماذج FAO المعتمدة دولياً، وتقدمها للفلاح بطريقة بسيطة — بالدارجة المغربية، بالصوت، وبالصور.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            {[
              { icon: "📡", title: "بيانات حقيقية", desc: "Open-Meteo للطقس، SoilGrids لخصائص التربة — مجاناً وبدون تسجيل." },
              { icon: "🔬", title: "نموذج FAO GAEZ v4", desc: "نفس المنهجية اللي كتستعملها الأمم المتحدة لتقييم ملاءمة الأراضي الزراعية." },
              { icon: "🤖", title: "ذكاء اصطناعي بالدارجة", desc: "Claude AI مضبوط خصيصاً للزراعة المغربية — كيفهم الأسئلة ويجاوب بالدارجة." },
              { icon: "♿", title: "شامل للجميع", desc: "واجهة صوتية كاملة للفلاح الأمي — ما محتاجش يقرأ أو يكتب." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(61,158,102,0.08)", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
                <h3 style={{ color: "#f0e6d0", fontSize: "16px", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6a8a6a", fontSize: "13px", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAO Model */}
        <section style={{ marginBottom: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#f0e6d0", marginBottom: "16px" }}>🔬 نموذج FAO العلمي</h2>
          <p style={{ color: "#7a9a7a", fontSize: "15px", lineHeight: 1.9, marginBottom: "24px" }}>
            كنستعملو نموذج دالة العضوية الاحترافية (Trapezoidal Membership Function) من FAO GAEZ v4 — نفس الأداة اللي كتستعملها الأمم المتحدة لتقييم 300 مليون هكتار حول العالم.
          </p>
          <div style={{ background: "#0d1f10", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "16px", padding: "28px", fontFamily: "monospace", fontSize: "14px", color: "#9ab89a", lineHeight: 2 }}>
            <div style={{ color: "#c98e52" }}>// معادلة الاحتراف الزراعي</div>
            <div><span style={{ color: "#3d9e66" }}>score</span> = s_temp × s_pH × s_rain</div>
            <div style={{ marginTop: "8px", color: "#c98e52" }}>// فئات الملاءمة (FAO)</div>
            <div><span style={{ color: "#2ecc71" }}>S1</span> ≥ 0.80 → ممتاز</div>
            <div><span style={{ color: "#f1c40f" }}>S2</span> 0.60–0.79 → جيد</div>
            <div><span style={{ color: "#e67e22" }}>S3</span> 0.40–0.59 → متوسط</div>
            <div><span style={{ color: "#e74c3c" }}>N</span> &lt; 0.40 → غير مناسب</div>
          </div>
          <p style={{ color: "#5a7a5a", fontSize: "13px", marginTop: "16px" }}>
            البيانات المرجعية من INRA Maroc وFellah-Trade وARDNA للمحاصيل الرئيسية المغربية.
          </p>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "48px", background: "rgba(61,158,102,0.06)", borderRadius: "24px", border: "1px solid rgba(61,158,102,0.15)" }}>
          <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "32px", color: "#f0e6d0", marginBottom: "16px" }}>جاهز تشوف المنهجية التقنية؟</h3>
          <Link href="/approach" style={{ background: "#3d9e66", color: "#fff", padding: "14px 36px", borderRadius: "12px", fontSize: "16px", textDecoration: "none", fontWeight: "700" }}>
            المنهجية ← 
          </Link>
        </div>
      </div>
    </div>
  );
}
