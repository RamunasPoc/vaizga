'use client';

import { motion } from 'framer-motion';

type Props = {
  onGeneratePDF: () => void;
  onShare: () => void;
  onReset: () => void;
};

export default function SalaryActions({ onGeneratePDF, onShare, onReset }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full pt-6">
      {/* Pagrindinis veiksmas - Dalintis */}
      <button
        onClick={onShare}
        className="
          w-full bg-indigo-600 hover:bg-indigo-700 
          text-white p-5 rounded-2xl 
          flex items-center justify-center gap-4 
          shadow-lg shadow-indigo-200 
          transition-all duration-200 
          active:scale-[0.97]
        "
      >
        <div className="bg-white/20 p-2 rounded-xl text-2xl">📲</div>
        <div className="text-left">
          <div className="text-lg font-bold leading-tight text-white">Siųsti ataskaitą</div>
          <div className="text-xs text-indigo-100 font-medium opacity-90">WhatsApp, Messenger, El. paštas</div>
        </div>
      </button>

      {/* Papildomi veiksmai eilutėje */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onGeneratePDF}
          className="
            flex flex-col items-center justify-center gap-2 
            bg-white border border-slate-200 
            hover:bg-slate-50 text-slate-700 
            p-4 rounded-2xl transition-all 
            shadow-sm active:scale-95
          "
        >
          <span className="text-xl">📄</span>
          <span className="text-xs font-bold uppercase tracking-wide">PDF Failas</span>
        </button>

        <button
          onClick={onReset}
          className="
            flex flex-col items-center justify-center gap-2 
            bg-white border border-red-100 
            hover:bg-red-50 text-red-500 
            p-4 rounded-2xl transition-all 
            shadow-sm active:scale-95
          "
        >
          <span className="text-xl">🗑️</span>
          <span className="text-xs font-bold uppercase tracking-wide">Išvalyti</span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 opacity-40 pt-2">
        <div className="h-px w-12 bg-slate-300 mb-2" />
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
        </p>
        <p className="text-[9px] text-slate-400 text-center px-4 leading-tight">
          Visi duomenys saugomi tik jūsų įrenginyje
        </p>
      </div>
    </div>
  );
}