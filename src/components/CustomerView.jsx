import React, { useState, useId } from 'react';
import { 
  Upload, FileText, Check, Clock, MapPin, ChevronRight, AlertTriangle, 
  Sparkles, Layers, Palette, Copy, Bike, Store, Shield, ArrowRight,
  Info, CheckCircle, RefreshCw
} from 'lucide-react';
import { MOCK_PARTNERS, PRESET_DOCUMENTS, PRICING_RULES } from '../data/mockData';

export default function CustomerView({ orders, onPlaceOrder, onSelectTrackingOrder, activeOrderId }) {
  // Wizard state
  const [activeStep, setActiveStep] = useState(1); // 1: Select Partner, 2: Upload & Specs, 3: Summary & Pay
  const [selectedPartnerId, setSelectedPartnerId] = useState(MOCK_PARTNERS[0].id);
  
  // Document state
  const [selectedDocPreset, setSelectedDocPreset] = useState(PRESET_DOCUMENTS[0]);
  const [customFile, setCustomFile] = useState(null);
  
  // Print options
  const [paperType, setPaperType] = useState('A4 80gr');
  const [printMode, setPrintMode] = useState('smart-mix'); // 'bw' | 'color' | 'smart-mix'
  const [doubleSided, setDoubleSided] = useState(false);
  const [bindingType, setBindingType] = useState('Lakban + Mika Bening');
  const [bindingColor, setBindingColor] = useState('Biru Tua');
  const [copies, setCopies] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'courier'
  const [deliveryAddress, setDeliveryAddress] = useState('Kosan Puri Ganesha No. 12, Kamar 4');
  const [customerName, setCustomerName] = useState('Budi Santoso (Mahasiswa)');
  const [customerPhone, setCustomerPhone] = useState('0813-9876-5432');
  const [notes, setNotes] = useState('Mohon cek penjilidan jangan sampai miring ya mas.');

  // Calculation logic
  const currentDoc = customFile || selectedDocPreset;
  const currentPartner = MOCK_PARTNERS.find(p => p.id === selectedPartnerId) || MOCK_PARTNERS[0];

  const totalPages = currentDoc.pages;
  let colorPages = 0;
  let bwPages = totalPages;

  if (printMode === 'color') {
    colorPages = totalPages;
    bwPages = 0;
  } else if (printMode === 'smart-mix') {
    colorPages = currentDoc.colorPagesCount;
    bwPages = currentDoc.bwPagesCount;
  } else {
    // bw mode
    colorPages = 0;
    bwPages = totalPages;
  }

  const paperRule = PRICING_RULES.paper[paperType] || PRICING_RULES.paper['A4 80gr'];
  const basePrintPerCopy = (bwPages * paperRule.bw) + (colorPages * paperRule.color);
  // If duplex, 10% discount on print cost
  const printCostPerCopy = doubleSided ? Math.round(basePrintPerCopy * 0.9) : basePrintPerCopy;
  const totalPrintCost = printCostPerCopy * copies;

  const bindingCostPerCopy = PRICING_RULES.binding[bindingType] || 0;
  const totalBindingCost = bindingCostPerCopy * copies;

  const deliveryCost = PRICING_RULES.delivery[deliveryMethod] || 0;
  const platformFee = PRICING_RULES.platformFee;
  const grandTotal = totalPrintCost + totalBindingCost + deliveryCost + platformFee;

  const handleCustomFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock parsing PDF
      const mockPageCount = Math.floor(Math.random() * 35) + 15;
      const mockColorCount = Math.floor(mockPageCount * 0.25);
      setCustomFile({
        id: 'custom-' + Date.now(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        pages: mockPageCount,
        colorPagesCount: mockColorCount,
        bwPagesCount: mockPageCount - mockColorCount,
        type: 'Dokumen Kustom'
      });
    }
  };

  const handleCheckout = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newOrderId = 'LP-' + Math.floor(1000 + Math.random() * 9000);

    const newOrderData = {
      id: newOrderId,
      customerName,
      customerPhone,
      docName: currentDoc.name,
      vendorId: currentPartner.id,
      vendorName: currentPartner.name,
      pages: totalPages,
      bwPages,
      colorPages,
      paperType,
      printMode,
      doubleSided,
      bindingType,
      bindingColor: bindingType !== 'Tanpa Jilid (Staples)' ? bindingColor : '-',
      copies,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'courier' ? deliveryAddress : undefined,
      pickupPin: randomPin,
      status: 'pending',
      notes,
      pricing: {
        printCost: totalPrintCost,
        bindingCost: totalBindingCost,
        deliveryCost,
        platformFee,
        total: grandTotal,
        vendorShare: totalPrintCost + totalBindingCost,
        platformShare: platformFee,
        courierShare: deliveryCost
      },
      createdAt: 'Baru saja',
      estimatedReady: '± 20 menit lagi'
    };

    onPlaceOrder(newOrderData);
  };

  // Find active tracking order
  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Active Order Banner if exists */}
        {activeOrder && (
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Pesanan Aktif Dipantau</span>
              </div>
              <span className="text-xs font-mono bg-blue-900/60 px-2 py-0.5 rounded border border-blue-400/30">
                #{activeOrder.id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-base truncate max-w-xs">{activeOrder.docName}</h4>
                <p className="text-xs text-blue-200 flex items-center gap-1 mt-0.5">
                  <Store className="w-3.5 h-3.5" /> {activeOrder.vendorName}
                </p>
              </div>

              {/* Status Pill */}
              <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">Status Saat Ini</div>
                  <div className="text-sm font-extrabold capitalize text-emerald-300">
                    {activeOrder.status === 'pending' && 'Menunggu Cetak'}
                    {activeOrder.status === 'printing' && 'Sedang Dicetak'}
                    {activeOrder.status === 'binding' && 'Sedang Dijilid'}
                    {activeOrder.status === 'ready' && '🎉 Siap Diambil!'}
                    {activeOrder.status === 'completed' && 'Selesai'}
                  </div>
                </div>
                {activeOrder.status === 'ready' && (
                  <div className="bg-emerald-400 text-emerald-950 font-mono font-bold px-2 py-1 rounded-lg text-xs animate-bounce">
                    PIN: {activeOrder.pickupPin}
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-blue-950/60 h-2 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full bg-emerald-400 transition-all duration-500 ${
                    activeOrder.status === 'pending' ? 'w-1/4' :
                    activeOrder.status === 'printing' ? 'w-2/4' :
                    activeOrder.status === 'binding' ? 'w-3/4' :
                    'w-full'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-blue-200 mt-1">
                <span>Diterima</span>
                <span>Cetak</span>
                <span>Jilid</span>
                <span>Siap Ambil</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Steps Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Step Indicators */}
          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/70 text-xs font-semibold">
            <button
              onClick={() => setActiveStep(1)}
              className={`py-3.5 px-3 flex items-center justify-center space-x-2 border-b-2 transition ${
                activeStep === 1
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>1</span>
              <span className="hidden sm:inline">Pilih Mitra</span>
            </button>

            <button
              onClick={() => setActiveStep(2)}
              className={`py-3.5 px-3 flex items-center justify-center space-x-2 border-b-2 transition ${
                activeStep === 2
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>2</span>
              <span className="hidden sm:inline">Upload & Atur</span>
            </button>

            <button
              onClick={() => setActiveStep(3)}
              className={`py-3.5 px-3 flex items-center justify-center space-x-2 border-b-2 transition ${
                activeStep === 3
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                activeStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>3</span>
              <span className="hidden sm:inline">Bayar</span>
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {/* STEP 1: PILIH MITRA / TOKO FOTOKOPI */}
            {activeStep === 1 && (
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
                        onClick={() => setSelectedPartnerId(partner.id)}
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
                  onClick={() => setActiveStep(2)}
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md shadow-blue-500/20"
                >
                  <span>Lanjut Konfigurasi Dokumen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: UPLOAD DOKUMEN & SPESIFIKASI */}
            {activeStep === 2 && (
              <div className="space-y-5">
                {/* File Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. File Dokumen (Khusus PDF)
                  </label>
                  
                  {/* Preset quick picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    {PRESET_DOCUMENTS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedDocPreset(preset);
                          setCustomFile(null);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          selectedDocPreset.id === preset.id && !customFile
                            ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-800 truncate">{preset.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
                          <span>{preset.pages} hlm</span>
                          <span className="text-blue-600 font-semibold">{preset.colorPagesCount} w / {preset.bwPagesCount} bw</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Or Custom Upload */}
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50/60 transition">
                    <input
                      type="file"
                      accept=".pdf"
                      id="pdf-upload"
                      className="hidden"
                      onChange={handleCustomFileUpload}
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-semibold text-blue-600 hover:underline">
                        Unggah file PDF Anda sendiri
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        Sistem otomatis menghitung jumlah lembar & deteksi halaman berwarna
                      </span>
                    </label>
                  </div>

                  {/* Current Active File Summary */}
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{currentDoc.name}</span>
                    </div>
                    <span className="shrink-0 bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                      {currentDoc.pages} Halaman
                    </span>
                  </div>
                </div>

                {/* Print Specs Config */}
                <div className="border-t border-slate-200 pt-4 space-y-4">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                    2. Spesifikasi Pencetakan
                  </h4>

                  {/* Jenis Kertas */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                      Ukuran & Gramatur Kertas:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {Object.keys(PRICING_RULES.paper).map((paper) => (
                        <button
                          key={paper}
                          type="button"
                          onClick={() => setPaperType(paper)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                            paperType === paper
                              ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {paper}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode Warna */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                      Mode Tinta & Warna:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPrintMode('smart-mix')}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          printMode === 'smart-mix'
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-bold text-slate-800">Smart Mix (Auto)</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Hemat biaya! Otomatis {currentDoc.colorPagesCount} hlm warna + {currentDoc.bwPagesCount} hlm hitam putih
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPrintMode('bw')}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          printMode === 'bw'
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800">Semua Hitam Putih</span>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Paling hemat: Seluruh {totalPages} hlm dicetak monokrom
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPrintMode('color')}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          printMode === 'color'
                            ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800">Semua Berwarna</span>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Seluruh {totalPages} halaman dicetak kualitas warna penuh
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Sisi Cetak (Duplex vs Simplex) */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-slate-800">Cetak Bolak-Balik (2 Sisi / Duplex)</span>
                      <p className="text-[11px] text-slate-500">Hemat kertas & diskon 10% tarif cetak</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doubleSided}
                        onChange={(e) => setDoubleSided(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Jenis Jilid */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                      Jenis Penjilidan:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.keys(PRICING_RULES.binding).map((bType) => (
                        <button
                          key={bType}
                          type="button"
                          onClick={() => setBindingType(bType)}
                          className={`p-3 rounded-xl border text-left transition ${
                            bindingType === bType
                              ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">{bType}</span>
                            <span className="text-xs font-extrabold text-blue-700">
                              {PRICING_RULES.binding[bType] === 0 
                                ? 'Gratis' 
                                : `+Rp ${PRICING_RULES.binding[bType].toLocaleString('id-ID')}`}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Jika Hard Cover atau Lakban, opsi warna */}
                    {bindingType !== 'Tanpa Jilid (Staples)' && (
                      <div className="mt-3 flex items-center space-x-2">
                        <span className="text-xs text-slate-600 font-medium">Pilihan Warna Sampul/Lakban:</span>
                        {['Biru Tua', 'Hijau Tua', 'Merah Marun', 'Hitam'].map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setBindingColor(color)}
                            className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                              bindingColor === color
                                ? 'bg-slate-800 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Copies */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-700">Jumlah Rangkap (Copies):</span>
                    <div className="flex items-center space-x-3 bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setCopies(Math.max(1, copies - 1))}
                        className="w-8 h-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-50"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-slate-900 w-6 text-center">{copies}</span>
                      <button
                        type="button"
                        onClick={() => setCopies(copies + 1)}
                        className="w-8 h-8 rounded-lg bg-white font-bold text-slate-700 shadow-xs flex items-center justify-center hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Catatan untuk Mitra */}
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">
                      Catatan Tambahan untuk Operator:
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Lampiran halaman 60 tolong jangan dilipat"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Back / Next Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="flex-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md shadow-blue-500/20 text-xs"
                  >
                    <span>Lanjut ke Ringkasan Biaya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: RINGKASAN BIAYA & METODE TERIMA */}
            {activeStep === 3 && (
              <div className="space-y-5">
                {/* Opsi Pengambilan / Pengantaran */}
                <div>
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2">
                    Metode Pengambilan
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        deliveryMethod === 'pickup'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Store className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">Ambil Sendiri</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Datang ke {currentPartner.name} setelah notif selesai
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Gratis Ongkir
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('courier')}
                      className={`p-3.5 rounded-xl border text-left transition ${
                        deliveryMethod === 'courier'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Bike className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">Diantar Kurir</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Kurir mahasiswa antar langsung ke kosan/kampus
                      </p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        +Rp 5.000
                      </span>
                    </button>
                  </div>

                  {deliveryMethod === 'courier' && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <label className="text-xs font-semibold text-slate-700 block">
                        Alamat Pengantaran (Radius Kampus):
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Ringkasan Biaya Realtime (Cost Breakdown) */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Rincian Transparansi Biaya</span>
                    <span className="text-[10px] font-normal text-slate-500">Tanpa Biaya Tersembunyi</span>
                  </h4>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>
                      Cetak {copies} rangkap × ({bwPages} hlm BW + {colorPages} hlm Warna)
                    </span>
                    <span className="font-medium text-slate-900">
                      Rp {totalPrintCost.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Penjilidan ({bindingType}) × {copies}</span>
                    <span className="font-medium text-slate-900">
                      Rp {totalBindingCost.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Ongkos Kirim ({deliveryMethod === 'pickup' ? 'Ambil Sendiri' : 'Kurir Mahasiswa'})</span>
                    <span className="font-medium text-slate-900">
                      {deliveryCost === 0 ? 'Rp 0' : `Rp ${deliveryCost.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      Biaya Layanan Platform
                      <span title="Pemeliharaan server & jaminan garansi cetak ulang" className="cursor-help text-slate-400">ⓘ</span>
                    </span>
                    <span className="font-medium text-slate-900">
                      Rp {platformFee.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-800">Total Pembayaran</span>
                    <span className="text-base font-black text-blue-700">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Legal / Risk Guarantee Check */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-start space-x-2.5">
                  <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Jaminan LapakPrint:</strong> Dokumen dicetak sesuai file PDF yang diunggah. Jika terjadi kesalahan teknis dari mitra (tinta bergaris/halaman terbalik), Anda berhak meminta cetak ulang gratis.
                  </p>
                </div>

                {/* Back / Pay Action */}
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setActiveStep(2)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
                  >
                    Ubah Spek
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-blue-500/25 text-xs"
                  >
                    <span>Bayar Lunas via QRIS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
