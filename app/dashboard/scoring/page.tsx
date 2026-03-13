"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { scoreAllCrops } from "@/lib/scoring";

interface CropResult {
  key: string;
  nameAr: string;
  scorePercent: number;
  faoClass: { label: string; color: string; arabicLabel: string };
  limitingFactor: string;
  moroccanSource: boolean;
  source: string;
  factors: { nameAr: string; score: number; value: string }[];
}

function ScoringContent() {
  const params = useSearchParams();
  const lat = parseFloat(params.get("lat") || "33.897");
  const lon = parseFloat(params.get("lon") || "-5.554");

  const [results, setResults] = useState<CropResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<{ temp: number; rain: number } | null>(null);
  const [soil, setSoil] = useState<{ ph: number } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAndScore() {
      try {
        // ── 1. Weather: Open-Meteo ──────────────────────────────────────
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_mean,precipitation_sum&past_days=30&forecast_days=1&timezone=auto`
        );
        const weatherData = await weatherRes.json();
        const temps: number[] = weatherData.daily.temperature_2m_mean.filter((t: number | null) => t !== null);
        const rains: number[] = weatherData.daily.precipitation_sum.filter((r: number | null) => r !== null);
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
        const totalRain = rains.reduce((a, b) => a + b, 0) * 12; // monthly → annual estimate
        setWeather({ temp: avgTemp, rain: totalRain });

    // ── 2. Soil: SoilGrids (with fallback) ─────────────────────────────
    let ph = 6.5; // Morocco average fallback
    try {
    const soilRes = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o&depth=0-5cm&value=mean`
    );
    if (soilRes.ok) {
        const soilData = await soilRes.json();
        const phRaw = soilData.properties?.layers?.[0]?.depths?.[0]?.values?.mean;
        if (phRaw) ph = phRaw / 10;
    }
    } catch {
    // SoilGrids unavailable, using Morocco average pH 6.5
    }
    setSoil({ ph });
        // ── 3. Score all crops ──────────────────────────────────────────
        const scored = scoreAllCrops(avgTemp, ph, totalRain);
        setResults(scored as CropResult[]);
      } catch (e) {
        setError("ماقدرناش نجيبو البيانات. خاصك تكون متصل بالإنترنت.");
      } finally {
        setLoading(false);
      }
    }
    fetchAndScore();
  }, [lat, lon]);

  if (loading) return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", color: "#9ab89a", gap: "16px" }}>
      <div style={{ fontSize: "48px" }}>🌾</div>
      <div style={{ fontSize: "18px" }}>جاري تحليل أرضك...</div>
      <div style={{ fontSize: "14px", color: "#6a8a6a" }}>جاري جلب بيانات الطقس والتربة</div>
    </main>
  );

  if (error) return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", color: "#e07040", fontSize: "18px" }}>
      {error}
    </main>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", fontFamily: "'Tajawal', sans-serif", color: "#ddeadc" }}>
      {/* Navbar */}
      <nav style={{ background: "#112214", borderBottom: "1px solid rgba(61,158,102,0.2)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🌾</span>
          <span style={{ fontFamily: "'Amiri', serif", fontSize: "20px", color: "#f0e6d0", fontWeight: "700" }}>GreenLife</span>
        </div>
        <a href="/dashboard" style={{ color: "#9ab89a", fontSize: "14px", textDecoration: "none" }}>← رجع للخريطة</a>
      </nav>

      <div style={{ padding: "40px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "32px", color: "#f0e6d0", margin: 0 }}>
            ملاءمة المحاصيل 🌱
          </h1>
          {results.length > 0 && weather && soil && (
            <button
              onClick={() => {
                const lines = [
                  `تقرير GreenLife — ملاءمة المحاصيل`,
                  `الموقع: ${lat.toFixed(3)}°, ${lon.toFixed(3)}°`,
                  `متوسط الحرارة: ${weather.temp.toFixed(1)}°C`,
                  `تقدير الأمطار: ${weather.rain.toFixed(0)} mm`,
                  `pH التربة: ${soil.ph.toFixed(1)}`,
                  ``,
                  ...results.map(c => `${c.nameAr}: ${c.scorePercent}% — ${c.faoClass.label} (${c.faoClass.arabicLabel})`),
                  ``,
                  `ملاحظة: هاد التقرير مبني على نموذج FAO GAEZ v4 وبيانات Open-Meteo وSoilGrids.`,
                ];
                const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `greenlife-rapport-${lat.toFixed(2)}-${lon.toFixed(2)}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{ background: "#3d9e66", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "14px", fontWeight: "700", fontFamily: "'Tajawal', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              ⬇️ تحميل التقرير
            </button>
          )}
        </div>

        {/* Weather + Soil summary */}
        {weather && soil && (
          <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
            {[
              { icon: "🌡️", label: "متوسط الحرارة", value: `${weather.temp.toFixed(1)}°C` },
              { icon: "🌧️", label: "تقدير الأمطار السنوية", value: `${weather.rain.toFixed(0)} mm` },
              { icon: "🪨", label: "pH التربة", value: `${soil.ph.toFixed(1)}` },
              { icon: "📍", label: "الموقع", value: `${lat.toFixed(3)}°, ${lon.toFixed(3)}°` },
            ].map((item, i) => (
              <div key={i} style={{ background: "#152818", border: "1px solid rgba(61,158,102,0.2)", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", color: "#9ab89a" }}>{item.label}</div>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#f0e6d0" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Crop results */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {results.map((crop) => (
            <div key={crop.key} style={{ background: "#152818", border: `1px solid ${crop.faoClass.color}40`, borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontFamily: "'Amiri', serif", fontSize: "22px", color: "#f0e6d0" }}>{crop.nameAr}</div>
                  {!crop.moroccanSource && (
                    <span style={{ background: "rgba(180,140,0,0.2)", color: "#c9a020", fontSize: "11px", padding: "2px 8px", borderRadius: "6px" }}>⚠️ FAO général</span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ background: `${crop.faoClass.color}25`, color: crop.faoClass.color, fontWeight: "700", fontSize: "14px", padding: "4px 12px", borderRadius: "8px" }}>
                    {crop.faoClass.label} — {crop.faoClass.arabicLabel}
                  </span>
                  <span style={{ fontSize: "24px", fontWeight: "700", color: crop.faoClass.color }}>{crop.scorePercent}%</span>
                </div>
              </div>

              {/* Score bar */}
              <div style={{ background: "#0b1c0d", borderRadius: "8px", height: "8px", marginBottom: "16px", overflow: "hidden" }}>
                <div style={{ width: `${crop.scorePercent}%`, height: "100%", background: crop.faoClass.color, borderRadius: "8px", transition: "width 1s ease" }} />
              </div>

              {/* Factor breakdown */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {crop.factors.map((f, i) => (
                  <div key={i} style={{ background: "#0b1c0d", borderRadius: "8px", padding: "8px 14px", fontSize: "13px" }}>
                    <span style={{ color: "#9ab89a" }}>{f.nameAr}: </span>
                    <span style={{ color: "#f0e6d0", fontWeight: "700" }}>{f.value}</span>
                    <span style={{ color: f.score >= 0.8 ? "#2d8a4e" : f.score >= 0.6 ? "#8ab22d" : f.score >= 0.4 ? "#e0a020" : "#c0392b", marginRight: "6px" }}>
                      {" "}({Math.round(f.score * 100)}%)
                    </span>
                  </div>
                ))}
                {crop.scorePercent < 80 && (
                  <div style={{ background: "rgba(180,60,20,0.15)", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", color: "#e07040" }}>
                    ⚠️ العامل المحدد: {crop.limitingFactor}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: "32px", background: "#152818", border: "1px solid rgba(201,142,82,0.2)", borderRadius: "12px", padding: "16px 20px", fontSize: "13px", color: "#9ab89a" }}>
          <strong style={{ color: "#c98e52" }}>ملاحظة منهجية: </strong>
          العتبات المصادر من INRA Maroc وFellah-Trade للقمح والزيتون والطماطم والبطاطا. باقي المحاصيل تعتمد على مراجع FAO العالمية — معرفة كمحدودية وتوجه للعمل المستقبلي.
        </div>
      </div>
    </main>
  );
}

export default function ScoringPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", color: "#9ab89a", fontSize: "18px" }}>
        جاري التحميل...
      </main>
    }>
      <ScoringContent />
    </Suspense>
  );
}