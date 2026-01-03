'use client';

interface Props {
  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  holidayPay: number; // Pridedame naują prop
}

export default function SalaryBreakdown({
  kmPay,
  loadPay,
  stationPay,
  extraPay,
  holidayPay,
}: Props) {
  // Suskaičiuojame galutinę sumą čia pat arba galite gauti iš tėvinio komponento
  const total = kmPay + loadPay + stationPay + extraPay + holidayPay;

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
      <h3 className="font-semibold text-base mb-3 border-b border-gray-700 pb-2">
        Algos sudėtis
      </h3>

      <Row label="Kilometrai" value={kmPay} />
      <Row label="Pakrovimai / iškrovimai" value={loadPay} />
      <Row label="Degalinės" value={stationPay} />
      <Row label="Papildomi darbai" value={extraPay} />
      
      {/* Pridedame eilutę šventinėms dienoms */}
      <Row 
        label="Šventinės dienos (priedas)" 
        value={holidayPay} 
        isHighlight={holidayPay > 0}
      />

      <div className="pt-2 mt-2 border-t border-gray-700">
        <div className="flex justify-between text-base font-bold text-green-400">
          <span>Iš viso (prieš mokesčius):</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
}

function Row({ 
  label, 
  value, 
  isHighlight = false 
}: { 
  label: string; 
  value: number; 
  isHighlight?: boolean 
}) {
  return (
    <div className="flex justify-between">
      <span className={isHighlight ? "text-red-400 font-medium" : "text-gray-300"}>
        {label}
      </span>
      <span className={`font-medium ${isHighlight ? "text-red-400" : ""}`}>
        {value > 0 ? value.toFixed(2) : '0.00'} €
      </span>
    </div>
  );
}