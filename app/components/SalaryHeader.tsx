'use client';

import Image from 'next/image';

export default function SalaryHeader({ total }: { total: number }) {
  return (
    <div className="bg-linear-to-r from-green-500 to-green-700 rounded-xl p-6 sm:p-8 text-center sm:text-left relative flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 shadow-lg">
      
      {/* Logotipas */}
      <div className="w-24 h-24 sm:w-36 sm:h-36 shrink-0">
        <Image
          src="/logoss.png"
          alt="Logo"
          width={150}
          height={150}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Tekstas */}
      <div className="flex flex-col items-center sm:items-start">
        <p className="text-sm sm:text-base uppercase text-white tracking-wider">Bendra alga</p>
        <p className="text-3xl sm:text-5xl font-bold text-white mt-1 sm:mt-2">
          {total > 0 ? total.toFixed(2) : ''} €
        </p>
      </div>
    </div>
  );
}
