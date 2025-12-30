'use client';

interface Props {
  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
}

export default function SalaryBreakdown({
  kmPay,
  loadPay,
  stationPay,
  extraPay,
}: Props) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
      <h3 className="font-semibold text-base">Algos sudėtis</h3>

      <Row label="Kilometrai" value={kmPay} />
      <Row label="Pakrovimai / iškrovimai" value={loadPay} />
      <Row label="Degalinės" value={stationPay} />
      <Row label="Papildomi darbai" value={extraPay} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-300">{label}</span>
      <span className="font-medium">
        {value > 0 ? value.toFixed(2) : '0.00'} €
      </span>
    </div>
  );
}
