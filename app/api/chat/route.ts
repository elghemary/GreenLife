import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { message, context, image, imageType, history } = await req.json();

    const conversationMessages: Anthropic.MessageParam[] = [];

    if (history && history.length > 1) {
      for (const msg of history.slice(0, -1)) {
        if (msg.role === "user") {
          const content: Anthropic.ContentBlockParam[] = [];
          if (msg.image) {
            content.push({
              type: "image",
              source: {
                type: "base64",
                media_type: (msg.imageType || "image/jpeg") as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
                data: msg.image,
              },
            });
          }
          if (msg.text && msg.text !== "📷 صورة") {
            content.push({ type: "text", text: msg.text });
          }
          if (content.length > 0) {
            conversationMessages.push({ role: "user", content });
          }
        } else {
          conversationMessages.push({ role: "assistant", content: msg.text });
        }
      }
    }

    const currentContent: Anthropic.ContentBlockParam[] = [];
    if (image) {
      const mediaType = (imageType || "image/jpeg") as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
      currentContent.push({
        type: "image",
        source: { type: "base64", media_type: mediaType, data: image },
      });
    }
    currentContent.push({
      type: "text",
      text: message || (image ? "شنو كاين فهاد الصورة؟ حلل التربة أو المحصول وعطيني رأيك الزراعي بالدارجة." : ""),
    });

    conversationMessages.push({ role: "user", content: currentContent });

    const systemPrompt = `أنت خبير زراعي مغربي اسمك "سي الزراعي". دائماً تجاوب بالدارجة المغربية الواضحة والبسيطة.

${context ? `السياق: ${context}` : ""}

مهمتك:
1. تجمع معلومات على أرض الفلاح: المساحة بالهكتار، مصدر الماء (سقي/شتا)، لون التربة، الميزانية.
2. بعد ما تجمع المعلومات، تعطيه توصيات محددة للمحاصيل المناسبة لموقعه ومواردو.
3. إذا رفع صورة، تحلل فيها التربة أو المحصول وتعطي رأيك الزراعي.
4. تستعمل أمثلة من الزراعة المغربية (القمح، الزيتون، الطماطم، إلخ).
5. جاوباتك قصيرة وعملية — الفلاح ما عندوش وقت للنظريات.
6. استعمل الأرقام والأمثلة الملموسة.

إذا ما عندكش معلومة، اسأل سؤال واحد فقط.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: conversationMessages,
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "عفواً، كاين مشكل.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "عفواً، كاين مشكل تقني. عاود المحاولة." },
      { status: 500 }
    );
  }
}
