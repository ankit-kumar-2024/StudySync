import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconSparkle, IconArrowRight } from '../components/common/Icons';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const initialPrompt = searchParams.get('prompt') || '';
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am Ace, your SATMS AI Study Assistant. What concept would you like to review?" }
  ]);
  const [input, setInput] = useState(initialPrompt);

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const sendMessage = (customText) => {
    const text = customText || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzing: "${text}"\n\n1. Review your high-yield formulas for this chapter.\n2. Attempt the 15-minute diagnostic test to verify retention.`
        }
      ]);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col justify-between bg-white rounded-3xl border border-[#dee9fc] p-5 font-['Inter',sans-serif]">
      <div className="flex items-center gap-2 pb-3 border-b border-[#dee9fc]">
        <IconSparkle className="w-5 h-5 text-[#3525cd]" />
        <h2 className="text-sm font-bold text-[#121c2a]">Ace — AI Study Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl text-xs max-w-md whitespace-pre-line ${m.sender === 'user' ? 'bg-[#3525cd] text-white' : 'bg-[#eff4ff] text-[#121c2a]'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2 pt-2 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Ace anything..."
          className="flex-1 px-4 py-2.5 bg-[#f8f9ff] border border-[#dee9fc] rounded-xl text-xs focus:outline-none"
        />
        <button type="submit" className="px-4 py-2.5 bg-[#3525cd] text-white rounded-xl text-xs font-bold">
          Send
        </button>
      </form>
    </div>
  );
}