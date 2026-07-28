import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let genAIClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Advisor API Endpoint
app.post("/api/ai-advisor", async (req, res) => {
  try {
    const { prompt, userContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "الرجاء كتابة السؤال أو استفسار الصيانة" });
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        reply: "أهلاً بك في متجر SOLIMAN - MEGA SYSTEM! يسعدنا مساعدتك في اختيار أحدث أجهزة أبل أو استشارة الصيانة. يرجى التواصل مع فريقنا مباشرة عبر واتساب الفرع أو زيارة أقرب فرع لك."
      });
    }

    const systemInstruction = `أنت المساعد الذكي الخبير لمتجر "SOLIMAN - MEGA SYSTEM" - المركز المعتمد والمتخصص في مبيعات وصيانة واستبدال أجهزة أبل في مصر.
مهامك:
1. إجابة استفسارات العملاء حول اختيار أجهزة الآيفون والماك والآيباد والساعات المناسبة لميزانيتهم وحاجتهم.
2. تقديم تشخيص أولي وأسعار صيانة تقريبية لأعطال الشاشة، البطارية، الباغة، منفذ الشحن، وتأثير السوائل.
3. توضيح مزايا الأجهزة المستعملة كالجديدة (99% مع ضمان 6 أشهر وبطاريات أصيلة).
4. شرح نظام استبدال الأجهزة القديمة وحساب القيمة التقديرية.
5. التحدث بأسلوب راقٍ، محترف، ودود، باللغة العربية اللبقة وبإيجاز مفيد.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "نعتذر، لم نتمكن من الحصول على رد حالياً. يمكنك إعادة المحاولة." });
  } catch (err: any) {
    console.error("AI Advisor Error:", err);
    res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب الذكي" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`iTech Stores server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
