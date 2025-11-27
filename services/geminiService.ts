export const getGeminiResponse = async (
  userMessage: string,
  context: string = "general"
): Promise<string> => {
  try {
    // Use local proxy server in development; in production the same endpoint
    // should be routed to a secure serverless function or backend.
    const apiUrl = (import.meta as any).env && (import.meta as any).env.DEV
      ? 'http://localhost:5174/api/gemini'
      : '/api/gemini';

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, context }),
    });

    if (!res.ok) {
      console.error('Gemini proxy returned error', res.statusText);
      return 'حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة لاحقاً.';
    }

    const data = await res.json();
    return data.text || 'عذراً، لم أستطع فهم ذلك.';
  } catch (error) {
    console.error('Gemini client error:', error);
    return 'حدث خطأ في الاتصال بالمساعد الذكي. يرجى المحاولة لاحقاً.';
  }
};
