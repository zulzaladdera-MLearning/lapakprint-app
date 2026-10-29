import React from 'react';
import { MapPin, Check, Clock, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function PartnerStep({ selectedPartnerId, onSelectPartner, onNext }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Pilih Mitra Fotokopi Terdekat</h3>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> Radius Geofencing: Kampus Utama (Maks. 1.5 km)
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
          3 Mitra Buka
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {MOCK_PARTNERS.map((partner) => {
          const isSelected = selectedPartnerId === partner.id;
          return (
            <div
              key={partner.id}
              onClick={() => onSelectPartner(partner.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl p-2 bg-white rounded-xl shadow-xs border border-slate-100">
                    {partner.avatar}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-slate-900 text-sm">{partner.name}</h4>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{partner.type} • {partner.distance}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        ⭐ {partner.rating} ({partner.reviewCount})
                      </span>
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Antrean: {partner.queueTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {partner.features.map((feat, idx) => (
                  <span key={idx} className="text-[10px] bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md shadow-blue-500/20"
      >
        <span>Lanjut Konfigurasi Dokumen</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
