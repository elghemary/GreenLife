"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  text: string;
  image?: string;
  imageType?: string;
  pdf?: string;
  pdfName?: string;
}

function ChatContent() {
  const params = useSearchParams();
  const lat = params.get("lat") || "33.897";
  const lon = params.get("lon") || "-5.554";
  const location = params.get("location") || "موقعك";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `السلام عليكم! أنا مستشارك الزراعي 🌾\n\nباش نعاونك مزيان، خصني نعرف شوية معلومات على أرضك:\n\n1️⃣ شحال كاين عندك من هكتار؟\n2️⃣ واش عندك ماء للسقي ولا كتعتمد على الشتا؟\n3️⃣ شنو لون التربة ديالك (حمرا، صفرا، سودا)؟\n4️⃣ شحال الميزانية ديالك تقريباً للهكتار؟\n\nجاوب على واحد واحد وأنا نعاونك!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageType, setImageType] = useState<string>("image/jpeg");
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── ElevenLabs TTS ────────────────────────────────────────────
  async function speak(text: string) {
    if (speaking) {
      audioRef.current?.pause();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      audio.play();
    } catch {
      setSpeaking(false);
    }
  }

  function stopSpeaking() {
    audioRef.current?.pause();
    setSpeaking(false);
  }

  // ── Voice Input ───────────────────────────────────────────────
  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("المتصفح ديالك ما كيدعمش الصوت. استعمل Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-MA";
    recognition.interimResults = false;
    recognitionRef.current = recognition;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
    };
    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  // ── Image Upload ──────────────────────────────────────────────
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const type = file.type || "image/jpeg";
    setImageType(type);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImagePreview(null);
    setImageBase64(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  // ── PDF Upload ────────────────────────────────────────────────
  function handlePdfChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPdfBase64(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }

  function clearPdf() {
    setPdfBase64(null);
    setPdfName(null);
    if (pdfRef.current) pdfRef.current.value = "";
  }

  // ── Send ──────────────────────────────────────────────────────
  async function sendMessage() {
    if ((!input.trim() && !imageBase64 && !pdfBase64) || loading) return;
    const userMsg = input.trim();
    setInput("");

    const newUserMsg: Message = {
      role: "user",
      text: userMsg || (pdfBase64 ? `📄 ${pdfName}` : "📷 صورة"),
      ...(imagePreview ? { image: imagePreview, imageType } : {}),
      ...(pdfBase64 ? { pdf: pdfBase64, pdfName: pdfName ?? undefined } : {}),
    };
    setMessages((prev) => [...prev, newUserMsg]);
    clearImage();
    clearPdf();
    setLoading(true);

    const history = [...messages, newUserMsg].slice(-10).map((m) => ({
      role: m.role,
      text: m.text,
      image: m.image ? m.image.split(",")[1] : undefined,
      imageType: m.imageType,
      pdf: m.pdf,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          context: `الموقع: ${location} (${lat}, ${lon})`,
          image: imageBase64,
          imageType,
          pdf: pdfBase64,
          history,
        }),
      });
      const data = await res.json();
      const reply = data.reply as string;
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      speak(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "عفواً، كاين مشكل. حاول مرة أخرى." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const btnStyle = (active: boolean, activeColor = "#3d9e66") => ({
    background: active ? activeColor : "rgba(61,158,102,0.15)",
    border: `1px solid ${active ? activeColor : "rgba(61,158,102,0.3)"}`,
    color: active ? "#fff" : "#9ab89a",
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "18px",
    cursor: "pointer",
    lineHeight: 1,
    flexShrink: 0,
  });

  return (
    <main style={{ minHeight: "100vh", background: "#0b1c0d", fontFamily: "'Tajawal', sans-serif", color: "#ddeadc", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <nav style={{ background: "#112214", borderBottom: "1px solid rgba(61,158,102,0.2)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🌾</span>
          <span style={{ fontFamily: "'Amiri', serif", fontSize: "20px", color: "#f0e6d0", fontWeight: "700" }}>GreenLife</span>
        </div>
        <a href="/dashboard" style={{ color: "#9ab89a", fontSize: "14px", textDecoration: "none" }}>← رجع للخريطة</a>
      </nav>

      {/* Header */}
      <div style={{ padding: "24px 32px 0", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "28px", color: "#f0e6d0", marginBottom: "4px" }}>المستشار الذكي 🤖</h1>
        <p style={{ color: "#9ab89a", fontSize: "13px", marginBottom: "16px" }}>{location} · اسأل بالدارجة أو بالصوت أو بالصورة</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {["شنو أحسن محصول لأرضي؟", "كيفاش نسقي الطماطم؟", "واش الزيتون مزيان؟", "مشكل فالتربة"].map((q, i) => (
            <button key={i} onClick={() => setInput(q)} style={{ background: "rgba(61,158,102,0.15)", border: "1px solid rgba(61,158,102,0.3)", color: "#9ab89a", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif" }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 32px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-start" : "flex-end", marginBottom: "16px" }}>
            <div style={{
              maxWidth: "78%",
              background: msg.role === "user" ? "#1e3b22" : "#152818",
              border: `1px solid ${msg.role === "user" ? "rgba(61,158,102,0.3)" : "rgba(61,158,102,0.15)"}`,
              borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              padding: "14px 18px",
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#f0e6d0",
            }}>
              {msg.image && (
                <img src={msg.image} alt="صورة" style={{ width: "100%", borderRadius: "8px", marginBottom: "8px", display: "block" }} />
              )}
              <span style={{ whiteSpace: "pre-wrap" }}>
                {msg.role === "assistant" && <span style={{ marginLeft: "6px" }}>🌾</span>}
                {msg.text}
              </span>
              {msg.role === "assistant" && (
                <button onClick={() => speak(msg.text)} title="استمع" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", marginRight: "6px", opacity: 0.5, marginTop: "6px", display: "block" }}>
                  🔊 استمع
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <div style={{ background: "#152818", border: "1px solid rgba(61,158,102,0.15)", borderRadius: "16px 16px 16px 4px", padding: "14px 18px", color: "#9ab89a", fontSize: "15px" }}>
              🌾 جاري التفكير...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div style={{ padding: "0 32px 8px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src={imagePreview} alt="preview" style={{ height: "80px", borderRadius: "8px", border: "1px solid rgba(61,158,102,0.4)" }} />
            <button onClick={clearImage} style={{ position: "absolute", top: "-8px", right: "-8px", background: "#c0392b", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontSize: "12px" }}>✕</button>
          </div>
        </div>
      )}

      {/* PDF preview */}
      {pdfName && (
        <div style={{ padding: "0 32px 8px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(201,142,82,0.12)", border: "1px solid rgba(201,142,82,0.3)", borderRadius: "8px", padding: "8px 12px" }}>
            <span style={{ fontSize: "18px" }}>📄</span>
            <span style={{ color: "#c98e52", fontSize: "13px" }}>{pdfName}</span>
            <button onClick={clearPdf} style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: "50%", width: "18px", height: "18px", cursor: "pointer", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding: "8px 32px 32px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "8px", background: "#152818", border: "1px solid rgba(61,158,102,0.3)", borderRadius: "16px", padding: "8px", alignItems: "center" }}>
          <button onClick={listening ? stopListening : startListening} title={listening ? "وقف" : "تكلم"} style={btnStyle(listening, "#e74c3c")}>
            {listening ? "⏹" : "🎤"}
          </button>
          <button onClick={() => fileRef.current?.click()} title="ارفع صورة" style={btnStyle(!!imagePreview)}>
            📷
          </button>
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImageChange} style={{ display: "none" }} />
          <button onClick={() => pdfRef.current?.click()} title="ارفع PDF" style={btnStyle(!!pdfBase64, "#c98e52")}>
            📄
          </button>
          <input ref={pdfRef} type="file" accept="application/pdf" onChange={handlePdfChange} style={{ display: "none" }} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={listening ? "🎤 كنسمع..." : "اكتب أو تكلم أو ارفع صورة..."}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#f0e6d0", fontSize: "15px", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minWidth: 0 }}
          />
          {speaking && (
            <button onClick={stopSpeaking} title="وقف الصوت" style={btnStyle(true, "#c98e52")}>⏸</button>
          )}
          <button
            onClick={sendMessage}
            disabled={loading || (!input.trim() && !imageBase64 && !pdfBase64)}
            style={{ background: loading || (!input.trim() && !imageBase64 && !pdfBase64) ? "#2a6b42" : "#3d9e66", color: "#fff", border: "none", borderRadius: "12px", padding: "10px 20px", fontSize: "15px", fontWeight: "700", fontFamily: "'Tajawal', sans-serif", cursor: "pointer", flexShrink: 0 }}
          >
            إرسال
          </button>
        </div>
        <p style={{ fontSize: "11px", color: "#4a6a4a", textAlign: "center", marginTop: "6px" }}>
          🎤 اضغط على الميكروفون وتكلم بالدارجة · 📷 ارفع صورة للتربة أو المحصول · 📄 ارفع ملف PDF
        </p>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: "100vh", background: "#0b1c0d", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", color: "#9ab89a", fontSize: "18px" }}>
        جاري التحميل...
      </main>
    }>
      <ChatContent />
    </Suspense>
  );
}
