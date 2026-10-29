import React, { useState } from 'react';
import { MOCK_PARTNERS, PRESET_DOCUMENTS, PRICING_RULES } from '../data/mockData';
import ActiveOrderBanner from '../features/customer-wizard/ActiveOrderBanner';
import PartnerStep from '../features/customer-wizard/PartnerStep';
import SpecsStep from '../features/customer-wizard/SpecsStep';
import PaymentStep from '../features/customer-wizard/PaymentStep';

export default function CustomerView({ orders, onPlaceOrder, onSelectTrackingOrder, activeOrderId }) {
  // Wizard state (1: Select Partner, 2: Upload & Specs, 3: Summary & Pay)
  const [activeStep, setActiveStep] = useState(1);
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
  const [customerName] = useState('Budi Santoso (Mahasiswa)');
  const [customerPhone] = useState('0813-9876-5432');
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

  const handleCustomFileUpload = (fileData) => {
    setCustomFile(fileData);
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
      cloudinary: currentDoc.cloudinary || null,
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

  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Active Order Banner */}
        <ActiveOrderBanner activeOrder={activeOrder} />

        {/* Wizard Card */}
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
            {activeStep === 1 && (
              <PartnerStep
                selectedPartnerId={selectedPartnerId}
                onSelectPartner={(id) => setSelectedPartnerId(id)}
                onNext={() => setActiveStep(2)}
              />
            )}

            {activeStep === 2 && (
              <SpecsStep
                currentDoc={currentDoc}
                selectedDocPreset={selectedDocPreset}
                customFile={customFile}
                onSelectDocPreset={(preset) => {
                  setSelectedDocPreset(preset);
                  setCustomFile(null);
                }}
                onCustomFileUpload={handleCustomFileUpload}
                paperType={paperType}
                setPaperType={setPaperType}
                printMode={printMode}
                setPrintMode={setPrintMode}
                doubleSided={doubleSided}
                setDoubleSided={setDoubleSided}
                bindingType={bindingType}
                setBindingType={setBindingType}
                bindingColor={bindingColor}
                setBindingColor={setBindingColor}
                copies={copies}
                setCopies={setCopies}
                notes={notes}
                setNotes={setNotes}
                onBack={() => setActiveStep(1)}
                onNext={() => setActiveStep(3)}
              />
            )}

            {activeStep === 3 && (
              <PaymentStep
                currentPartner={currentPartner}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                copies={copies}
                bwPages={bwPages}
                colorPages={colorPages}
                totalPrintCost={totalPrintCost}
                bindingType={bindingType}
                totalBindingCost={totalBindingCost}
                deliveryCost={deliveryCost}
                platformFee={platformFee}
                grandTotal={grandTotal}
                onBack={() => setActiveStep(2)}
                onCheckout={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
