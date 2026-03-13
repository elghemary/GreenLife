// ─── Trapezoidal membership function ───────────────────────────────────────
// Returns 1.0 inside [b,c], linear rise from a→b, linear fall from c→d, 0 outside
export function trapezoid(value: number, a: number, b: number, c: number, d: number): number {
  if (value <= a || value >= d) return 0;
  if (value >= b && value <= c) return 1;
  if (value < b) return (value - a) / (b - a);
  return (d - value) / (d - c);
}

// ─── Crop data ──────────────────────────────────────────────────────────────
// Format: { temp: [a,b,c,d], ph: [a,b,c,d], rain: [a,b,c,d] or null }
// Sources: INRA Maroc, Fellah-Trade, ARDNA, FAO
export const CROPS: Record<string, {
  nameAr: string;
  temp: [number, number, number, number];
  ph: [number, number, number, number];
  rain: [number, number, number, number] | null; // null = irrigated
  source: string;
  moroccanSource: boolean;
}> = {
  ble: {
    nameAr: "القمح",
    temp: [0, 5, 25, 35],
    ph: [5.0, 5.5, 7.5, 8.5],
    rain: [200, 300, 800, 1000],
    source: "INRA Maroc + Fellah-Trade",
    moroccanSource: true,
  },
  olivier: {
    nameAr: "الزيتون",
    temp: [-8, 5, 35, 40],
    ph: [5.5, 6.0, 8.0, 8.5],
    rain: [150, 200, 800, 1000],
    source: "Fellah-Trade + ARDNA (2016)",
    moroccanSource: true,
  },
  tomate: {
    nameAr: "الطماطم",
    temp: [8, 12, 30, 35],
    ph: [4.5, 5.5, 6.8, 8.0],
    rain: null, // irrigated: 7000 m³/ha
    source: "INRA Maroc (2023) + Fellah-Trade",
    moroccanSource: true,
  },
  pommedeterre: {
    nameAr: "البطاطا",
    temp: [5, 10, 22, 30],
    ph: [4.5, 5.0, 6.0, 7.0],
    rain: null,
    source: "Agrimaroc.ma",
    moroccanSource: true,
  },
  concombre: {
    nameAr: "الخيار",
    temp: [10, 18, 30, 38],
    ph: [5.5, 6.0, 7.0, 7.5],
    rain: null,
    source: "FAO général ⚠️",
    moroccanSource: false,
  },
  mais: {
    nameAr: "الذرة",
    temp: [8, 15, 32, 40],
    ph: [5.0, 5.8, 7.0, 8.0],
    rain: [400, 500, 800, 1000],
    source: "FAO général ⚠️",
    moroccanSource: false,
  },
  tournesol: {
    nameAr: "دوار الشمس",
    temp: [5, 15, 28, 35],
    ph: [5.5, 6.0, 7.5, 8.0],
    rain: [250, 300, 700, 900],
    source: "FAO général ⚠️",
    moroccanSource: false,
  },
  menthe: {
    nameAr: "النعناع",
    temp: [5, 10, 25, 32],
    ph: [5.5, 6.0, 7.0, 7.5],
    rain: null,
    source: "FAO général ⚠️",
    moroccanSource: false,
  },
  oignon: {
    nameAr: "البصل",
    temp: [5, 10, 25, 35],
    ph: [5.5, 6.0, 7.5, 8.0],
    rain: null,
    source: "FAO général ⚠️",
    moroccanSource: false,
  },
};

// ─── FAO suitability class ──────────────────────────────────────────────────
export function getFAOClass(score: number): { label: string; color: string; arabicLabel: string } {
  if (score >= 0.80) return { label: "S1", color: "#2d8a4e", arabicLabel: "ممتاز" };
  if (score >= 0.60) return { label: "S2", color: "#8ab22d", arabicLabel: "جيد" };
  if (score >= 0.40) return { label: "S3", color: "#e0a020", arabicLabel: "متوسط" };
  return { label: "N", color: "#c0392b", arabicLabel: "غير مناسب" };
}

// ─── Score a single crop ────────────────────────────────────────────────────
export function scoreCrop(
  cropKey: string,
  temp: number,      // °C average
  ph: number,        // soil pH
  rain: number,      // mm/year (from Open-Meteo)
): {
  score: number;
  scorePercent: number;
  faoClass: ReturnType<typeof getFAOClass>;
  factors: { name: string; nameAr: string; score: number; value: string }[];
  limitingFactor: string;
} {
  const crop = CROPS[cropKey];
  if (!crop) throw new Error(`Unknown crop: ${cropKey}`);

  const s_temp = trapezoid(temp, ...crop.temp);
  const s_ph = trapezoid(ph, ...crop.ph);
  const s_rain = crop.rain ? trapezoid(rain, ...crop.rain) : 1.0; // irrigated = no rain penalty

  // Multiplicative FAO model
  const score = s_temp * s_ph * s_rain;

  const factors = [
    { name: "Temperature", nameAr: "الحرارة", score: s_temp, value: `${temp.toFixed(1)}°C` },
    { name: "pH", nameAr: "حموضة التربة", score: s_ph, value: `pH ${ph.toFixed(1)}` },
    { name: "Rain", nameAr: "التساقطات", score: s_rain, value: crop.rain ? `${rain.toFixed(0)}mm` : "مروي" },
  ];

  const limitingFactor = factors.reduce((a, b) => a.score < b.score ? a : b).nameAr;

  return {
    score,
    scorePercent: Math.round(score * 100),
    faoClass: getFAOClass(score),
    factors,
    limitingFactor,
  };
}

// ─── Score all crops ────────────────────────────────────────────────────────
export function scoreAllCrops(temp: number, ph: number, rain: number) {
  return Object.entries(CROPS).map(([key, crop]) => ({
    key,
    nameAr: crop.nameAr,
    moroccanSource: crop.moroccanSource,
    source: crop.source,
    ...scoreCrop(key, temp, ph, rain),
  })).sort((a, b) => b.score - a.score);
}