'use client';

export default function SalaryHeader({ total }: { total: number }) {
  return (
    <div className="bg-green-600 rounded-xl p-6 text-center">
      <p className="text-sm uppercase">Bendra alga</p>
      <p className="text-5xl font-bold">
        {total > 0 ? total.toFixed(2) : ''} €
      </p>
    </div>
  );
}
