import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";

interface ChatbotPageProps {
  bloom: any; // you can replace `any` with your actual data type like BloomEvent[]
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ bloom }) => {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "🌿 Hello! I'm your Bloom Analysis Assistant. How can I help you today?" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
  
    console.log("Bloom data sent to backend:", bloom);

    try {
      const response = await fetch("https://bloomwatch-backend.onrender.com/chatbot-analysis", {  // no trailing slash
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg.text,
          region_data: bloom,
        }),
      });
      console.log(JSON.stringify(bloom))
      const data = await response.json();
  
      const replyText = data.parsed?.summary || data.reply_text || "Sorry, I couldn't process that.";
  
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: replyText },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, I couldn't reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start space-x-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "bot" && (
              <div className="p-2 bg-gray-700 rounded-full">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {msg.role === "user" && (
              <div className="p-2 bg-blue-600 rounded-full text-white">
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {/* Bot Thinking Indicator */}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Bot size={16} />
            <span>Analyzing your data...</span>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t border-gray-700 flex items-center space-x-3 bg-gray-800">
        <input
          type="text"
          placeholder="Ask about your bloom region data..."
          className="flex-1 p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
          disabled={loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
