import React, { useState } from 'react';
import { X, Check, Copy, Smartphone, Heart, ArrowRight, ShieldCheck, Printer, HelpCircle } from 'lucide-react';
import { CHURCH_INFO, GIVING_CATEGORIES } from '../data/churchData';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const GivingModal: React.FC<GivingModalProps> = ({ isOpen, onClose, defaultCategory = 'tithe' }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(defaultCategory);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('1000');
  const [selectedPaybill, setSelectedPaybill] = useState<'equity' | 'kcb'>('equity');
  const [copiedPaybill, setCopiedPaybill] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [showConfirmationTip, setShowConfirmationTip] = useState(false);

  if (!isOpen) return null;

  const currentCategory = GIVING_CATEGORIES.find(c => c.id === selectedCategoryId) || GIVING_CATEGORIES[0];
  const paybillNumber = selectedPaybill === 'equity' ? CHURCH_INFO.paybillNumber : CHURCH_INFO.altPaybillNumber;
  
  // Format Account Number: e.g. "TITHE-KAMAU" or default to Category Suffix
  const cleanName = donorName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const accountNumber = cleanName ? `${currentCategory.accountSuffix}-${cleanName}` : currentCategory.accountSuffix;

  const handleCopyPaybill = () => {
    navigator.clipboard.writeText(paybillNumber);
    setCopiedPaybill(true);
    setTimeout(() => setCopiedPaybill(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleWhatsAppConfirmation = () => {
    const message = encodeURIComponent(
      `Praise God Vicar, I have sent an offering of KES ${amount || '---'} to ACK St. Mary's Ngariama Church via M-Pesa.\nPurpose: ${currentCategory.name}\nAccount: ${accountNumber}\nName: ${donorName || 'Parishioner'}. God bless you.`
    );
    window.open(`https://wa.me/254${CHURCH_INFO.phone.substring(1)}?text=${message}`, '_blank');
  };

  const presetAmounts = ['300', '500', '1000', '2500', '5000', '10000'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-purple-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Smartphone className="w-4 h-4" />
            <span>M-Pesa Tithes & Offerings Portal</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Give to ACK St. Mary's Ngariama Church</h3>
          <p className="text-purple-200 text-sm mt-1">
            "Honor the Lord with your wealth, with the firstfruits of all your crops." — Proverbs 3:9
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Select Giving Purpose */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              1. Select Giving Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GIVING_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-800 bg-purple-50 text-purple-950 font-semibold ring-1 ring-purple-800'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono mt-1">Acct: {cat.accountSuffix}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-stone-500 mt-1.5 italic">
              {currentCategory.description}
            </p>
          </div>

          {/* Step 2: Donor Name & Preset Amount */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Your Full Name (For Church Records)
              </label>
              <input
                type="text"
                placeholder="e.g. Peter Kamau"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent bg-white text-stone-900"
              />
              <span className="text-[11px] text-stone-500 block mt-1">
                Generates your personalized M-Pesa account reference.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Amount (KES)
              </label>
              <input
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-semibold tabular-nums border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent bg-white text-stone-900"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`px-2 py-0.5 text-xs rounded border transition tabular-nums ${
                      amount === preset
                        ? 'bg-purple-900 text-white border-purple-900'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    KES {Number(preset).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Verified M-Pesa Payment Card with 1-Click Copy */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                  Official M-Pesa Paybill Details
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPaybill('equity')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                    selectedPaybill === 'equity'
                      ? 'bg-purple-900 text-white'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Paybill 247247
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaybill('kcb')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                    selectedPaybill === 'kcb'
                      ? 'bg-purple-900 text-white'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  Paybill 522522
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Business Number */}
              <div className="bg-white p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Business No / Paybill:</span>
                  <span className="text-xl font-bold font-mono text-purple-900 tracking-wider">
                    {paybillNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPaybill}
                  className="px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-900 hover:bg-purple-100 rounded-md border border-purple-200 flex items-center gap-1 transition"
                >
                  {copiedPaybill ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Account Number */}
              <div className="bg-white p-3.5 rounded-lg border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">Account Number:</span>
                  <span className="text-base font-bold font-mono text-purple-900 tracking-tight">
                    {accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-900 hover:bg-purple-100 rounded-md border border-purple-200 flex items-center gap-1 transition"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Step-by-step M-Pesa Instructions */}
            <div className="mt-4 pt-3 border-t border-stone-200/60 text-xs text-stone-600">
              <p className="font-semibold text-stone-800 mb-1.5">How to Complete on your Phone:</p>
              <ol className="list-decimal list-inside space-y-1 text-stone-600">
                <li>Open <strong>M-Pesa</strong> &gt; Select <strong>Lipa na M-Pesa</strong> &gt; <strong>Paybill</strong></li>
                <li>Enter Business Number: <strong className="font-mono text-purple-900">{paybillNumber}</strong></li>
                <li>Enter Account Number: <strong className="font-mono text-purple-900">{accountNumber}</strong></li>
                <li>Enter Amount: <strong className="font-mono">KES {amount ? Number(amount).toLocaleString() : '---'}</strong></li>
                <li>Enter your M-Pesa PIN and confirm.</li>
              </ol>
            </div>
          </div>

          {/* Action Row: WhatsApp confirmation or Print slip */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppConfirmation}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Smartphone className="w-4 h-4" />
              <span>Send Confirmation to Church Treasurer via WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>
          </div>

          {/* Church Treasurer Contact note */}
          <div className="text-[11px] text-stone-500 bg-amber-50/70 border border-amber-200/60 rounded-lg p-3 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              All tithes and offerings go directly to the official <strong>ACK St. Mary's Ngariama Church</strong> parish account overseen by the Vicar and Parish Council. For financial inquiries or official physical receipts, contact Church Treasurer at <span className="font-semibold text-stone-800">{CHURCH_INFO.phone}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
