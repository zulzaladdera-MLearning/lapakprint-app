import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Bot, Zap } from 'lucide-react';
import PosterGeneratorTab from './PosterGeneratorTab';
import FailoverChatTab from './FailoverChatTab';

export default function MultimodalPosterStudio({ onBack, onStartOrderWithPoster }) {
  const [activeTab, setActiveTab] = useState('multimodal'); // 'multimodal' | 'chat'

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-200 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              AI Multimodal & Distributed Router
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Round-Robin Active
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
            LapakPrint Hermes AI Studio & Multimodal Pipeline
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Integrasi Gemini 3.8 Flash Vision, Runware Fast FLUX Image Diffusion, dan Failover Router.
          </p>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="self-start md:self-auto px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm"
          >
            ← Kembali ke Katalog
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 mb-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('multimodal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'multimodal'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Multimodal Pipeline (Gemini Vision ➔ Runware FLUX)</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'chat'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Asisten Konsultasi Cetak (Round-Robin Failover)</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'multimodal' ? (
        <PosterGeneratorTab onStartOrderWithPoster={onStartOrderWithPoster} />
      ) : (
        <FailoverChatTab />
      )}
    </div>
  );
}
