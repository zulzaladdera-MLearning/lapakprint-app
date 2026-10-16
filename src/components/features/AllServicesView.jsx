import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ArrowRight } from 'lucide-react';
import { MOCK_PARTNERS } from '../../data/mockData';

export default function AllServicesView({ onBack, onStartOrder }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  const services = [
    { id: 's1', name: 'Jilid Hard Cover Skripsi Embos Emas', cat: 'skripsi', price: 35000, desc: 'Karton tebal no. 30/40, pita pembatas, hotprint emas/perak' },
    { id: 's2', name: 'Print Draf Makalah & Tugas A4 70gr', cat: 'draf', price: 250, desc: 'Tarif hemat untuk bimbingan dosen dan tugas mingguan' },
    { id: 's3', name: 'Print Kertas PaperOne A4 80gr', cat: 'draf', price: 350, desc: 'Standar kertas resmi untuk diserahkan ke dosen penguji' },
    { id: 's4', name: 'Jilid Spiral Kawat Double Loop', cat: 'spiral', price: 12000, desc: 'Kawat ganda kuat, buku bisa dibuka 360 derajat flat' },
    { id: 's5', name: 'Jilid Spiral Plastik (Comb)', cat: 'spiral', price: 8000, desc: 'Praktis, halaman kertas bisa dibongkar pasang jika ada revisi' },
    { id: 's6', name: 'Jilid Lakban Biasa + Mika Bening', cat: 'draf', price: 3000, desc: 'Standar jilid laporan praktikum dan makalah' },
    { id: 's7', name: 'Cetak Poster Seminar Hasil A3 Full Color', cat: 'poster', price: 8000, desc: 'Art Paper tebal 260gr, warna tajam tidak pudar' },
    { id: 's8', name: 'Plotter Denah Arsitektur A1 Kertas Kalkir', cat: 'poster', price: 45000, desc: 'Resolusi garis mikro presisi untuk studio arsitektur' },
    { id: 's9', name: 'Print Jurnal Ilmiah IEEE Template (Staples)', cat: 'draf', price: 1000, desc: 'Cetakan warna presisi dua sisi untuk submisi paper' },
    { id: 's10', name: 'Layanan Kurir Antar Berkas ke Kamar Kos', cat: 'kurir', price: 5000, desc: 'Kurir mahasiswa siap antar dalam radius 1.5 km kampus' }
  ];

  const filtered = services.filter(s => {
    if (selectedCat !== 'all' && s.cat !== selectedCat) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-[#f5f5f5] min-h-[calc(100vh-8rem)] py-5 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <button onClick={onBack} className="hover:text-sky-600 font-bold flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Semua Layanan Percetakan Kampus</span>
        </div>

        {/* Header Bar with Search & Filter */}
        <div className="bg-white rounded-xs p-5 shadow-2xs border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Katalog Lengkap Seluruh Layanan</h2>
              <p className="text-xs text-slate-500">Temukan layanan yang sesuai dengan kebutuhan akademik Anda</p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari layanan apa saja..."
                className="w-full text-xs p-2 pl-8 border border-slate-300 rounded-xs focus:outline-none focus:border-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-bold pt-1 border-t border-slate-100">
            {[
              { id: 'all', label: 'Semua Layanan' },
              { id: 'skripsi', label: '📘 Jilid Skripsi' },
              { id: 'draf', label: '📄 Draf & Makalah' },
              { id: 'spiral', label: '🌀 Spiral & Mika' },
              { id: 'poster', label: '🎨 Poster & Plotter' },
              { id: 'kurir', label: '🛵 Kurir Antar' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id)}
                className={`px-3 py-1.5 rounded-xs transition ${
                  selectedCat === tab.id
                    ? 'bg-sky-500 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xs p-4 border border-slate-200 shadow-2xs hover:border-sky-300 transition flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
                <div className="text-sm font-black text-sky-600 pt-1">
                  Mulai Rp {item.price.toLocaleString('id-ID')}
                </div>
              </div>

              <button
                onClick={() => onStartOrder(MOCK_PARTNERS[0])}
                className="py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xs shadow-2xs transition shrink-0 flex items-center space-x-1"
              >
                <span>Pesan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
