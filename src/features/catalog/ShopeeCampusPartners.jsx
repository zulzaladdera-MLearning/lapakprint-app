import React from 'react';
import { MapPin } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function ShopeeCampusPartners({ onSelectPartnerForOrder, onNavigateFeature }) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 mt-3 sm:mt-5">
      <div className="bg-white rounded-lg sm:rounded-xs shadow-2xs border border-slate-200/80">
        <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-[10px] sm:text-xs font-black bg-sky-600 text-white px-1.5 sm:px-2 py-0.5 rounded-xs tracking-wider">
              MITRA RESMI
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
              Percetakan Terdekat (Geofencing Kampus)
            </h3>
          </div>
          <span 
            onClick={() => onNavigateFeature('partners')}
            className="text-[11px] sm:text-xs text-sky-600 font-semibold cursor-pointer hover:underline shrink-0 ml-2"
          >
            Semua ➔
          </span>
        </div>

        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {MOCK_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="border border-slate-200 rounded-xs p-4 hover:border-sky-400 transition bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start space-x-3">
                  <span className="text-3xl p-2 bg-sky-50 rounded-lg border border-sky-100">
                    {partner.avatar}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1 rounded">
                      {partner.badge}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                      {partner.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-500" /> {partner.distance}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    ⭐ {partner.rating}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{partner.soldCount} order</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-600 font-semibold">{partner.queueTime}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPartnerForOrder(partner)}
                className="w-full mt-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs transition shadow-2xs flex items-center justify-center space-x-1"
              >
                <span>Mulai Order di Toko Ini</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
