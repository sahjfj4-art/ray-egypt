const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Set it in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

app.post('/api/gemini', async (req, res) => {
  try {
    const { message, context } = req.body;
    const modelId = 'gemini-2.5-flash';

    let systemInstruction = '';
    if (context === 'merchant') {
      systemInstruction = `
        أنت مساعد ذكي لمنصة "راي" (RAY) للتجار.
        دورك مساعدة التاجر في كتابة وصف للمنتجات، تحليل المبيعات، واقتراح أفكار تسويقية.
        تحدث باللغة العربية بلهجة مصرية مهنية ومحترفة.
        اسمك "مساعد راي".
      `;
    } else {
      systemInstruction = `
        أنت مساعد ذكي لمنصة "راي" (RAY) للمتسوقين.
        دورك مساعدة المستخدم في العثور على المطاعم، المحلات، والخدمات.
        تحدث باللغة العربية بلهجة مصرية ودودة.
        اسمك "مساعد راي".
      `;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || 'عذراً، لم أستطع فهم ذلك.' });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    res.status(500).json({ text: 'حدث خطأ في الخادم عند الاتصال بالمساعد الذكي.' });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on port ${PORT}`);
});
