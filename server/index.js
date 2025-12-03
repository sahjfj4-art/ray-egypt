const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5174;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3003'],
  credentials: true
}));

// Body parser with size limit
app.use(bodyParser.json({ limit: '1mb' }));

// Rate limiting for Gemini API
const geminiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per windowMs
  message: {
    error: 'Too many requests to Gemini API, please try again later.'
  }
});

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Set it in environment variables.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

app.post('/api/gemini', geminiLimiter, async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        text: 'الرسالة مطلوبة ويجب أن تكون نصاً صحيحاً.' 
      });
    }
    
    // Limit message length
    if (message.length > 5000) {
      return res.status(400).json({ 
        text: 'الرسالة طويلة جداً. الحد الأقصى 5000 حرف.' 
      });
    }
    
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

    const responseText = response.text || 'عذراً، لم أستطع فهم ذلك.';
    
    // Limit response length
    const maxResponseLength = 10000;
    const finalResponse = responseText.length > maxResponseLength 
      ? responseText.substring(0, maxResponseLength) + '...'
      : responseText;
    
    res.json({ text: finalResponse });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    
    // Don't expose internal error details
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'حدث خطأ في الخادم عند الاتصال بالمساعد الذكي.';
    
    res.status(500).json({ text: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server listening on port ${PORT}`);
});
