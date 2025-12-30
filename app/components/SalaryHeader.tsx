'use client';

import Image from 'next/image';

export default function SalaryHeader({ total }: { total: number }) {
  return (
    <div className="bg-green-600 rounded-xl p-6 text-center relative flex flex-col items-center sm:items-start sm:text-left">
      {/* Logotipas */}
      <div className="w-24 h-24 sm:w-36 sm:h-36 mb-4 sm:mb-0">
        <Image 
          src="/logoss.png" 
          alt="Logo" 
          width={150} 
          height={150} 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Tekstas */}
      <div>
        <p className="text-sm uppercase text-white">Bendra alga</p>
        <p className="text-5xl font-bold text-white">
          {total > 0 ? total.toFixed(2) : ''} €
        </p>
      </div>
    </div>
  );
}
