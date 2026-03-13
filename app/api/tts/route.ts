import { NextRequest, NextResponse } from "next/server";

// Best available Arabic voices on ElevenLabs
// We'll try "Omar" (Arabic) first, fallback to "Aria"
const VOICE_ID = "IKne3meq5aSn9XLyUdCD"; // Omar - Arabic male voice

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "no text" }, { status: 400 });

    // Strip emojis for cleaner TTS
    const cleanText = text.replace(/[\u{1F300}-\u{1FFFF}]/gu, "").replace(/[🌾🤖📷🎤⏹⏸🔊1️⃣2️⃣3️⃣4️⃣]/g, "").trim();

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", err);
      return NextResponse.json({ error: err }, { status: 500 });
    }

    const audioBuffer = await response.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return NextResponse.json({ error: "TTS failed" }, { status: 500 });
  }
}
