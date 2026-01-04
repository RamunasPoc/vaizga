'use client';

interface Props {
  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  holidayPay: number;
  nightPay: number; // Pridėtas naujas prop naktiniam darbui
}

export default function SalaryBreakdown({
  kmPay,
  loadPay,
  stationPay,
  extraPay,
  holidayPay,
  nightPay,
}: Props) {
  // Į bendrą sumą įtraukiame naktinį priedą
  const total = kmPay + loadPay + stationPay + extraPay + holidayPay + nightPay;

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-2 text-sm shadow-lg border border-gray-700">
      <h3 className="font-semibold text-base mb-3 border-b border-gray-700 pb-2 text-gray-100">
        Algos sudėtis 
      </h3>

      <Row label="Kilometrai" value={kmPay} />
      <Row label="Pakrovimai / iškrovimai" value={loadPay} />
      <Row label="Degalinės" value={stationPay} />
      <Row label="Papildomi darbai" value={extraPay} />
      
      {/* Naktinis darbas */}
      <Row 
        label="Naktinis darbas (+20€/nakt.)" 
        value={nightPay} 
        isHighlight={nightPay > 0}
        highlightColor="text-blue-400"
      />
      
      {/* Šventinės dienos */}
      <Row 
        label="Šventinės dienos (priedas x2)" 
        value={holidayPay} 
        isHighlight={holidayPay > 0}
        highlightColor="text-red-400"
      />

      <div className="pt-2 mt-2 border-t border-gray-700">
        <div className="flex justify-between text-lg font-bold text-green-400">
          <span>IŠ VISO:</span>
          <span>{total.toFixed(2)} €</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 text-right italic">
          *Suma nurodyta po mokesčių.
        </p>
      </div>
    </div>
  );
}

function Row({ 
  label, 
  value, 
  isHighlight = false,
  highlightColor = "text-red-400"
}: { 
  label: string; 
  value: number; 
  isHighlight?: boolean;
  highlightColor?: string;
}) {
  return (
    <div className="flex justify-between py-0.5">
      <span className={isHighlight ? `${highlightColor} font-medium` : "text-gray-400"}>
        {label}
      </span>
      <span className={`font-medium ${isHighlight ? highlightColor : "text-gray-200"}`}>
        {value > 0 ? value.toFixed(2) : '0.00'} €
      </span>
    </div>
  );
}