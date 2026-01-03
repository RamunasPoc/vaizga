'use client';

type Props = {
  onGeneratePDF: () => void;
  onShare: () => void; // Dalinimosi funkcija
};

export default function SalaryActions({ onGeneratePDF, onShare }: Props) {
  return (
    <div className="flex flex-col gap-3 w-full pt-4">
      {/* Pagrindinis veiksmas - Siųsti (WhatsApp/Viber) */}
      <button
        onClick={onShare}
        className="w-full bg-green-600 hover:bg-green-700 active:scale-95 transition-transform p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-900/20"
      >
        <span className="text-2xl">📲</span>
        <div className="text-left">
          <div className="text-lg font-bold leading-none">Siųsti ataskaitą</div>
          <div className="text-xs opacity-80 font-normal">WhatsApp, Viber, El. paštas</div>
        </div>
      </button>

      {/* Papildomas veiksmas - Išsaugoti PDF į įrenginį */}
      <button
        onClick={onGeneratePDF}
        className="w-full bg-gray-800 hover:bg-gray-750 active:scale-95 transition-transform p-4 rounded-2xl flex items-center justify-center gap-2 border border-gray-700 text-gray-300"
      >
        <span className="text-xl">💾</span>
        <span className="font-semibold">Išsaugoti kaip PDF</span>
      </button>

      <p className="text-[9px] text-gray-500 text-center px-4 uppercase tracking-tighter">
        Paspaudus „Siųsti“, bus sugeneruotas pasirašytas vaizdas ir atidarytas dalinimosi langas
      </p>
    </div>
  );
}