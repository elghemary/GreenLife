"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function PricingPage() {
  const tiers = [
    {
      name: "فلاح",
      nameAr: "Fellah",
      price: "مجاني",
      priceNote: "للشهر الأول",
      color: "#3d9e66",
      borderColor: "rgba(61,158,102,0.3)",
      bg: "rgba(61,158,102,0.06)",
      badge: null,
      features: [
        "تقييم ملاءمة 9 محاصيل",
        "بيانات طقس وتربة موقعك",
        "خريطة تفاعلية بـ GPS",
        "مستشار ذكي 10 أسئلة/يوم",
        "تسجيل موقع واحد",
        "واجهة صوتية أساسية",
      ],
      notIncluded: [
        "تقارير PDF مفصلة",
        "تاريخ المحاصيل",
        "دعم متعدد المواقع",
      ],
      cta: "ابدا مجاناً",
      ctaHref: "/signup",
    },
    {
      name: "تعاونية",
      nameAr: "Coopérative",
      price: "—",
      priceNote: "",
      color: "#c98e52",
      borderColor: "rgba(201,142,82,0.4)",
      bg: "rgba(201,142,82,0.06)",
      badge: "الأكثر طلباً",
      features: [
        "كل ميزات فلاح",
        "مستشار ذكي غير محدود",
        "حتى 20 موقع زراعي",
        "تقارير PDF قابلة للتحميل",
        "تاريخ المحاصيل والتوصيات",
        "رفع صور للتحليل",
        "دعم بالبريد الإلكتروني",
        "تحديثات بيانات أسبوعية",
      ],
      notIncluded: [
        "API للمطورين",
        "لوحة تحكم المؤسسة",
      ],
      cta: "تواصل معنا",
      ctaHref: "/contact",
    },
    {
      name: "شركة",
      nameAr: "Entreprise",
      price: "—",
      priceNote: "",
      color: "#9ab89a",
      borderColor: "rgba(154,184,154,0.3)",
      bg: "rgba(154,184,154,0.04)",
      badge: null,
      features: [
        "كل ميزات تعاونية",
        "مواقع غير محدودة",
        "API كامل للمطورين",
        "لوحة تحكم مؤسسية",
        "تكامل مع أنظمة ERP",
        "نموذج LSTM مخصص",
        "شراكة بيانات ONCA",
        "دعم مخصص 24/7",
        "تدريب الفريق",
      ],
      notIncluded: [],
      cta: "تواصل معنا",
      ctaHref: "/contact",
    },
  ];

  return (
    <div style={{ background: "#080f09", color: "#ddeadc", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>

      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "52px", color: "#f0e6d0", marginBottom: "16px" }}>الأسعار</h1>
          <p style={{ color: "#6a8a6a", fontSize: "17px" }}>ابدا مجاناً — سلّم مع نمو مزرعتك</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{
              background: tier.bg,
              border: `1px solid ${tier.borderColor}`,
              borderRadius: "24px",
              padding: "36px",
              position: "relative",
              transform: i === 1 ? "scale(1.03)" : "scale(1)",
              boxShadow: i === 1 ? `0 0 40px rgba(201,142,82,0.15)` : "none",
            }}>
              {tier.badge && (
                <div style={{ position: "absolute", top: "-14px", right: "50%", transform: "translateX(50%)", background: "#c98e52", color: "#fff", padding: "4px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>
                  {tier.badge}
                </div>
              )}

              <div style={{ marginBottom: "28px" }}>
                <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: tier.color, marginBottom: "4px" }}>{tier.name}</h2>
                <div style={{ color: "#4a6a4a", fontSize: "13px", marginBottom: "20px" }}>{tier.nameAr}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontFamily: "'Amiri', serif", fontSize: "42px", color: "#f0e6d0", fontWeight: "700" }}>{tier.price}</span>
                  {tier.priceNote && <span style={{ color: "#5a7a5a", fontSize: "14px" }}>{tier.priceNote}</span>}
                </div>
              </div>

              <Link href={tier.ctaHref} style={{
                display: "block", textAlign: "center",
                background: i === 1 ? "#c98e52" : i === 0 ? "#3d9e66" : "rgba(154,184,154,0.15)",
                color: "#fff",
                padding: "14px", borderRadius: "12px",
                fontSize: "16px", textDecoration: "none", fontWeight: "700",
                marginBottom: "28px",
                border: i === 2 ? "1px solid rgba(154,184,154,0.3)" : "none",
              }}>
                {tier.cta}
              </Link>

              <div>
                {tier.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                    <span style={{ color: tier.color, fontSize: "14px", marginTop: "2px" }}>✓</span>
                    <span style={{ color: "#8aaa8a", fontSize: "14px" }}>{f}</span>
                  </div>
                ))}
                {tier.notIncluded.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                    <span style={{ color: "#3a4a3a", fontSize: "14px", marginTop: "2px" }}>✗</span>
                    <span style={{ color: "#3a4a3a", fontSize: "14px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "80px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "36px", color: "#f0e6d0", textAlign: "center", marginBottom: "40px" }}>أسئلة شائعة</h2>
          <div style={{ display: "grid", gap: "16px" }}>
            {[
              { q: "واش محتاج كارطة بنكية للحساب المجاني؟", a: "لا — الحساب المجاني ما محتاجش أي معلومة بنكية. ابدا مباشرة ببريدك الإلكتروني." },
              { q: "كيفاش كيتحسب الموقع؟", a: "كنستعملو GPS ديال الهاتف أو كتحدد الموقع يدوياً على الخريطة — بدون ما تدخل أي عنوان." },
              { q: "واش البيانات ديالي آمنة؟", a: "نعم — البيانات مخزنة على Supabase (servers أوروبا) مع تشفير كامل." },
              { q: "واش يمكن الاستعمال بدون إنترنت؟", a: "التطبيق يحتاج إنترنت للذكاء الاصطناعي والبيانات الجوية — نعملو على نسخة offline للمستقبل." },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(61,158,102,0.05)", border: "1px solid rgba(61,158,102,0.12)", borderRadius: "14px", padding: "24px 28px" }}>
                <h3 style={{ color: "#f0e6d0", fontSize: "16px", marginBottom: "10px" }}>{item.q}</h3>
                <p style={{ color: "#5a7a5a", fontSize: "14px", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
