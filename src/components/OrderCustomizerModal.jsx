import React, { useState } from 'react';
import { 
  X, Upload, FileText, Sparkles, Store, Shield, 
  ArrowRight, Bike, Check, AlertCircle, Info 
} from 'lucide-react';
import { PRESET_DOCUMENTS, PRICING_RULES } from '../data/mockData';
import CloudinaryUploadBox from '../features/customizer/CloudinaryUploadBox';

export default function OrderCustomizerModal({ 
  isOpen, 
  onClose, 
  partner, 
  currentUser,
  onProceedToCheckout 
}) {
  if (!isOpen || !partner) return null;

  // Selected document state
  const [selectedDocPreset, setSelectedDocPreset] = useState(PRESET_DOCUMENTS[0]);
  const [customFile, setCustomFile] = useState(null);
  const [cloudinaryMetadata, setCloudinaryMetadata] = useState(null);

  // Configuration options
  const [paperType, setPaperType] = useState('A4 80gr');
  const [printMode, setPrintMode] = useState('smart-mix');
  const [doubleSided, setDoubleSided] = useState(false);
  const [bindingType, setBindingType] = useState('Hard Cover Skripsi (Embos Emas)');
  const [bindingColor, setBindingColor] = useState('Biru Tua');
  const [copies, setCopies] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('Kosan Puri Ganesha No. 12, Kamar 4');
  const [notes, setNotes] = useState('Warna sampul biru tua standar Fakultas Ilmu Komputer');

  const currentDoc = customFile || selectedDocPreset;
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
    colorPages = 0;
    bwPages = totalPages;
  }

  const paperRule = PRICING_RULES.paper[paperType] || PRICING_RULES.paper['A4 80gr'];
  const basePrintPerCopy = (bwPages * paperRule.bw) + (colorPages * paperRule.color);
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
      const mockPageCount = Math.floor(Math.random() * 40) + 15;
      const mockColorCount = Math.floor(mockPageCount * 0.2);
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

  const handleCheckoutClick = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newOrderId = 'LP-' + Math.floor(1000 + Math.random() * 9000);

    const orderData = {
      id: newOrderId,
      customerName: currentUser?.name || 'Budi Santoso',
      customerPhone: currentUser?.phone || '0813-9876-5432',
      docName: currentDoc.name,
      vendorId: partner.id,
      vendorName: partner.name,
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
      cloudinary: cloudinaryMetadata,
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
      createdAt: 'Baru Saja',
      estimatedReady: '± 20 menit lagi'
    };

    onProceedToCheckout(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-sky-100 my-6 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Modal ala Shopee Product Variation */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-sky-50/60 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 bg-white rounded-2xl border border-sky-100 shadow-xs">
              {partner.avatar}
            </span>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-400 text-amber-950">
                  {partner.badge}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {partner.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{partner.distance} • ⭐ {partner.rating}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
          
          {/* Section 1: Upload / Choose PDF */}
          <div>
            <label className="block font-bold text-slate-800 uppercase tracking-wider mb-2">
              1. Dokumen yang Dicetak (Wajib PDF)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2.5">
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
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-bold text-slate-800 truncate">{preset.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>{preset.pages} hlm</span>
                    <span className="text-sky-600 font-bold">{preset.colorPagesCount} w / {preset.bwPagesCount} bw</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-2">
              <CloudinaryUploadBox
                onUploadComplete={(meta) => {
                  setCloudinaryMetadata(meta);
                  const mockPageCount = Math.floor(Math.random() * 35) + 18;
                  const mockColorCount = Math.floor(mockPageCount * 0.25);
                  setCustomFile({
                    id: 'custom-' + Date.now(),
                    name: meta.original_filename,
                    size: (meta.bytes / (1024 * 1024)).toFixed(1) + ' MB',
                    pages: mockPageCount,
                    colorPagesCount: mockColorCount,
                    bwPagesCount: mockPageCount - mockColorCount,
                    type: 'Dokumen Kustom (Cloudinary CDN)',
                    cloudinary: meta
                  });
                }}
              />
            </div>

            <div className="mt-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-700 truncate">{currentDoc.name}</span>
              <span className="font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded shrink-0">
                {totalPages} Halaman Terdeteksi
              </span>
            </div>
          </div>

          {/* Section 2: Pilihan Kertas & Tinta */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <div>
              <span className="font-bold text-slate-700 block mb-1.5">Pilihan Kertas:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(PRICING_RULES.paper).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPaperType(p)}
                    className={`py-2 px-2.5 rounded-xl border font-bold transition ${
                      paperType === p
                        ? 'border-sky-500 bg-sky-500 text-white shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1.5">Mode Tinta:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPrintMode('smart-mix')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    printMode === 'smart-mix'
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span className="font-bold text-slate-800">Smart Mix (Auto)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {currentDoc.colorPagesCount} warna + {currentDoc.bwPagesCount} hitam putih
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrintMode('bw')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    printMode === 'bw'
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-800">Semua Hitam Putih</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Lebih hemat untuk draf bimbingan
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrintMode('color')}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    printMode === 'color'
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-800">Semua Berwarna</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Kualitas warna penuh tiap halaman
                  </p>
                </button>
              </div>
            </div>

            {/* Duplex switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800">Cetak Bolak-Balik (Duplex)</span>
                <span className="text-[10px] text-sky-600 block">Diskon 10% tarif cetak</span>
              </div>
              <input
                type="checkbox"
                checked={doubleSided}
                onChange={(e) => setDoubleSided(e.target.checked)}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Jenis Jilid & Sampul */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <span className="font-bold text-slate-700 block">Jenis Penjilidan:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.keys(PRICING_RULES.binding).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBindingType(b)}
                  className={`p-3 rounded-xl border text-left transition ${
                    bindingType === b
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{b}</span>
                    <span className="font-extrabold text-sky-600">
                      {PRICING_RULES.binding[b] === 0 ? 'Gratis' : `+Rp ${PRICING_RULES.binding[b].toLocaleString('id-ID')}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {bindingType !== 'Tanpa Jilid (Staples)' && (
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-slate-600 font-medium">Warna Cover:</span>
                {['Biru Tua', 'Hijau Tua', 'Merah Marun', 'Hitam'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBindingColor(c)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      bindingColor === c
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Rangkap & Pengambilan */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Jumlah Rangkap (Copies):</span>
              <div className="flex items-center space-x-3 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-7 h-7 bg-white rounded-lg font-bold shadow-xs hover:bg-slate-50 flex items-center justify-center"
                >
                  -
                </button>
                <span className="font-bold text-slate-900 w-6 text-center">{copies}</span>
                <button
                  type="button"
                  onClick={() => setCopies(copies + 1)}
                  className="w-7 h-7 bg-white rounded-lg font-bold shadow-xs hover:bg-slate-50 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1.5">Metode Penerimaan:</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryMethod === 'pickup'
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                    <Store className="w-4 h-4 text-sky-600" />
                    <span>Ambil di Toko</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-1">Gratis Ongkir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-3 rounded-xl border text-left transition ${
                    deliveryMethod === 'courier'
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-400/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                    <Bike className="w-4 h-4 text-sky-600" />
                    <span>Kurir Mahasiswa</span>
                  </div>
                  <span className="text-[10px] text-sky-600 font-bold block mt-1">+Rp 5.000 (Radius Kampus)</span>
                </button>
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Catatan Tambahan untuk Kasir:</span>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Lampiran halaman 60 tolong jangan dilipat"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

        </div>

        {/* Modal Footer (Sticky Price & Buy Button ala Shopee) */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] text-slate-500 block">Total Estimasi Pembayaran:</span>
            <div className="text-xl font-black text-sky-600">
              Rp {grandTotal.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-slate-400">Sudah termasuk biaya cetak, jilid & admin</span>
          </div>

          <button
            onClick={handleCheckoutClick}
            className="w-full sm:w-auto py-3 px-8 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 transition flex items-center justify-center space-x-2"
          >
            <span>Beli Sekarang / Bayar QRIS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
