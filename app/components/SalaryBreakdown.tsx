'use client';

interface Props {
  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  holidayPay: number;
  nightPay: number;
  sleepPay: number;
}

export default function SalaryBreakdown({
  kmPay,
  loadPay,
  stationPay,
  extraPay,
  holidayPay,
  nightPay,
  sleepPay,
}: Props) {
  const total = kmPay + loadPay + stationPay + extraPay + holidayPay + nightPay + sleepPay;

  return (
    <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm border border-slate-200/80">
      <h3 className="font-bold text-lg border-b border-slate-100 pb-3 text-slate-800 flex items-center gap-2">
        <span>📊</span> Algos sudėtis <span className="text-xs font-normal text-slate-400 normal-case">(į rankas)</span>
      </h3>

      <div className="space-y-1.5">
        <Row label="Kilometrai" value={kmPay} />
        <Row label="Pakrovimai / iškrovimai" value={loadPay} />
        <Row label="Degalinės" value={stationPay} />
        <Row label="Papildomi darbai" value={extraPay} />
        
        {/* Nakvynės vilkike */}
        <Row 
          label="Nakvynės vilkike (+20€)" 
          value={sleepPay} 
          isHighlight={sleepPay > 0}
          highlightColor="text-amber-700 bg-amber-50 border-amber-100"
        />
        
        {/* Naktinis darbas */}
        <Row 
          label="Naktinis darbas (+20€)" 
          value={nightPay} 
          isHighlight={nightPay > 0}
          highlightColor="text-indigo-700 bg-indigo-50 border-indigo-100"
        />
        
        {/* Šventinės dienos - ATNAUJINTA LOGIKA */}
        <Row 
          label="Šventinės dienos (+50€ priedas)" 
          value={holidayPay} 
          isHighlight={holidayPay > 0}
          highlightColor="text-rose-700 bg-rose-50 border-rose-100"
        />
      </div>

      <div className="pt-4 mt-2 border-t-2 border-slate-100">
        <div className="flex justify-between items-baseline text-xl font-black text-indigo-600">
          <span className="text-sm font-bold text-slate-700">IŠ VISO:</span>
          <span className="text-2xl tracking-tight">{total.toFixed(2)} €</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 text-right italic">
          *Suma apskaičiuota realiuoju laiku pagal nustatytus įkainius.
        </p>
      </div>
    </div>
  );
}

function Row({ 
  label, 
  value, 
  isHighlight = false,
  highlightColor = "text-slate-800"
}: { 
  label: string; 
  value: number; 
  isHighlight?: boolean;
  highlightColor?: string;
}) {
  if (isHighlight) {
    return (
      <div className={`flex justify-between items-center py-2 px-3 rounded-xl border ${highlightColor} my-1 transition-all duration-200`}>
        <span className="font-semibold text-xs uppercase tracking-wider">{label}</span>
        <span className="font-bold text-sm">{value.toFixed(2)} €</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center py-2 px-1 text-sm border-b border-slate-50/60 last:border-0">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="font-semibold text-slate-800">
        {value > 0 ? value.toFixed(2) : '0.00'} €
      </span>
    </div>
  );
}