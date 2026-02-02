const API_KEY = "iABVUTQEsaZahTSeW1tvy0xYTXCDSQfwmk0HtHh9"; 
const API_URL = "https://api.cohere.ai/v2/chat";

export const sendMessageToCohere = async (message, history = []) => {
  try {
    // 1. Format history for Cohere V2 (role: user/assistant/system)
    const formattedMessages = [
      ...history
        .filter(msg => msg.content && typeof msg.content === 'string')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
      { role: "user", content: message }
    ];

    // 2. Make the request
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        model: "command-a-03-2025", // Cohere's latest high-performance model
        messages: formattedMessages
      })
    });

    const data = await response.json();

    // 3. Handle API Errors
    if (!response.ok) {
      throw new Error(data.message || `Cohere Error: ${response.status}`);
    }

    // 4. Extract text from Cohere V2 response structure
    // Path: data.message.content[0].text
    return data.message.content[0].text;

  } catch (error) {
    console.error("Cohere API Error:", error);
    return `System Error: ${error.message}`;
  }
};