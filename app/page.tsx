'use client';
import { useState, Dispatch, SetStateAction } from 'react';

export default function DriverSalaryCalculator() {
  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>(''); // dabar įvedame tik pakrovimus
  const [stations, setStations] = useState<number | ''>('');

  // KM atlygis
  const kmPay = (Number(km) / 100) * 11;

  // Pakrovimai + iškrovimai (1 val. už pakrovimą ir 1 val. už iškrovimą)
  const totalLoadHours = Number(loads) * 2; // 1 val pakrovimas + 1 val iškrovimas
  const loadPay = totalLoadHours * 7.6;

  // Degalinės atlygis
  const stationPay = (Number(stations) * 20 / 60) * 7.6;

  const total = kmPay + loadPay + stationPay;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 flex flex-col justify-between">

      {/* ALGA – DIDELĖ */}
      <div className="bg-green-600 rounded-xl p-6 text-center mb-6 shadow-lg">
        <p className="text-sm uppercase tracking-wide">Tavo alga</p>
        <p className="text-5xl font-extrabold mt-2">
          {isNaN(total) ? '0.00' : total.toFixed(2)} €
        </p>
      </div>

      {/* ĮVESTYS */}
      <div className="space-y-4">
        <Input label="Nuvažiuoti km" value={km} setValue={setKm} />
        <Input label="Pakrovimu skaičius terminale" value={loads} setValue={setLoads} />
        <Input label="Degalinės" value={stations} setValue={setStations} />
      </div>

      {/* DETALĖS */}
      <div className="mt-6 bg-gray-800 rounded-xl p-4 text-sm space-y-1">
        <Row text="KM atlygis" value={kmPay} />
        <Row text="Pakrovimai + iškrovimai" value={loadPay} />
        <Row text="Degalinės" value={stationPay} />
      </div>
    </main>
  );
}

// Tipai Input komponentui
interface InputProps {
  label: string;
  value: number | '';
  setValue: Dispatch<SetStateAction<number | ''>>;
}

function Input({ label, value, setValue }: InputProps) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))}
        className="w-full p-4 text-lg rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

// Tipai Row komponentui
interface RowProps {
  text: string;
  value: number;
}

function Row({ text, value }: RowProps) {
  return (
    <div className="flex justify-between">
      <span>{text}</span>
      <span>{value.toFixed(2)} €</span>
    </div>
  );
}
