'use client';

export default function SalaryHeader({ total }: { total: number }) {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 sm:p-8 text-center sm:text-left relative flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-600/15 overflow-hidden">
      
      {/* Subtilus dekoratyvinis foninis elementas modernumui */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      {/* Tekstas ir skaičius */}
      <div className="flex flex-col items-center sm:items-start z-10">
        <p className="text-xs sm:text-sm uppercase font-bold text-indigo-100 tracking-widest flex items-center gap-1.5">
          <span>👛</span> Mėnesio uždarbis (į rankas)
        </p>
        <p className="text-4xl sm:text-5xl font-black text-white mt-1.5 tracking-tight drop-shadow-xs">
          {total > 0 ? total.toFixed(2) : '0.00'} €
        </p>
      </div>

      {/* Papildomas informacinis ženkliukas dešinėje */}
      <div className="z-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-indigo-50 uppercase tracking-wider hidden sm:block">
        ⚡ Skaičiuojama gyvai
      </div>
    </div>
  );
}