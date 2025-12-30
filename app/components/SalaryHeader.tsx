'use client';

import Image from 'next/image';

export default function SalaryHeader({ total }: { total: number }) {
  return (
    <div className="bg-green-600 rounded-xl p-6 text-center relative">
      {/* Logotipas viršuje kairėje */}
      <div className="absolute top-4 left-4">
        <Image src="/logoss.png" alt="Logo" width={150} height={150} />
      </div>

      {/* Tekstas */}
      <p className="text-sm uppercase">Bendra alga</p>
      <p className="text-5xl font-bold">
        {total > 0 ? total.toFixed(2) : ''} €
      </p>
    </div>
  );
}
