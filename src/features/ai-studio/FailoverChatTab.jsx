import React, { useState } from 'react';
import { Send, Bot, RefreshCw } from 'lucide-react';
import { chatWithAIRouter, AI_PROVIDERS } from '../../services/aiRouter';

export default function FailoverChatTab() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Saya Asisten AI LapakPrint terdistribusi. Didukung oleh orkestrasi Google Gemini 3.8 Flash High (9router), OpenRouter, SiliconFlow, dan Ollama Lokal. Ada yang ingin Anda konsultasikan seputar spesifikasi kertas, jilid skripsi, atau kalkulasi biaya cetak?',
      provider: '9router (Google Gemini 3.8 Flash High)',
      latencyMs: 140
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('9router_gemini');

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    setChatInput('');
    const newMsgList = [...messages, { role: 'user', content: userText }];
    setMessages(newMsgList);
    setIsChatLoading(true);

    try {
      const res = await chatWithAIRouter({
        messages: newMsgList.map(m => ({ role: m.role, content: m.content })),
        systemPrompt: 'Anda adalah Asisten Resmi LapakPrint: marketplace jasa percetakan kampus terpadu. Berikan jawaban informatif, ringkas, dan praktis seputar gramatur kertas, format skripsi hardcover, jilid spiral, kalkulator biaya, dan poster.',
        preferredProvider: selectedProvider
      });

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: res.content,
          provider: res.providerName,
          modelUsed: res.modelUsed,
          latencyMs: res.latencyMs,
          failoverCount: res.failoverCount
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Maaf, terjadi kendala koneksi ke gateway AI: ' + err.message,
          provider: 'Local Error Handler'
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[560px]">
      {/* Provider Selection & Status Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-700">Router Failover Status:</span>
          <span className="text-slate-500">Auto-switch pada HTTP 429</span>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-[11px] font-semibold text-slate-500">Target Utama:</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none"
          >
            {AI_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none shadow-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
              }`}
            >
              <p className="whitespace-pre-line">{msg.content}</p>
              {msg.provider && (
                <div className="mt-2 pt-1.5 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{msg.provider}</span>
                  {msg.latencyMs && <span>{msg.latencyMs} ms</span>}
                </div>
              )}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic px-3 py-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-500" />
            <span>Memproses penalaran melalui AI Router...</span>
          </div>
        )}
      </div>

      {/* Chat Input Box */}
      <form
        onSubmit={handleSendChat}
        className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2"
      >
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Tanyakan gramatur kertas, jilid skripsi, atau estimasi cetak..."
          className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          disabled={isChatLoading || !chatInput.trim()}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md disabled:opacity-50 flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Kirim</span>
        </button>
      </form>
    </div>
  );
}
