'use client';

type Props = {
  onGeneratePDF: () => void;
  onShare: () => void;
  onReset: () => void; // Pridėtas reset prop
};

export default function SalaryActions({ onGeneratePDF, onShare, onReset }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full pt-4">
      {/* Pagrindinis veiksmas - Dalintis */}
      <button
        onClick={onShare}
        className="w-full bg-green-600 hover:bg-green-700 active:scale-95 transition-all p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
      >
        <span className="text-2xl">📲</span>
        <div className="text-left">
          <div className="text-lg font-bold leading-none">Siųsti ataskaitą</div>
          <div className="text-xs opacity-80 font-normal text-green-100">WhatsApp, Viber, El. paštas</div>
        </div>
      </button>

      {/* Papildomi veiksmai eilutėje */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onGeneratePDF}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-750 active:scale-95 p-4 rounded-2xl border border-gray-700 text-gray-300 transition-all"
        >
          <span className="text-lg">💾</span>
          <span className="text-sm font-semibold">Sugeneruoti ataskaitą</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/30 active:scale-95 p-4 rounded-2xl border border-red-900/30 text-red-400 transition-all"
        >
          <span className="text-lg">🗑️</span>
          <span className="text-sm font-semibold">Išvalyti</span>
        </button>
      </div>

      <p className="text-[9px] text-gray-600 text-center px-4 uppercase tracking-tighter">
        v1.5 | Ataskaita bus sugeneruota automatiškai
      </p>
    </div>
  );
}