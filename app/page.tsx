'use client';
import { useState, Dispatch, SetStateAction } from 'react';

export default function DriverSalaryCalculator() {
  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>(''); // pakrovimai terminale
  const [stations, setStations] = useState<number | ''>('');
  const [extraHours, setExtraHours] = useState<number | ''>(''); // papildomas darbas

  // Skaičiavimai
  const kmPay = (Number(km) / 100) * 11;

  const loadHours = Number(loads) * 2; // pakrovimas + iškrovimas
  const loadPay = loadHours * 7.6;

  const stationPay = (Number(stations) * 20 / 60) * 7.6;

  const extraPay = Number(extraHours) * 7.6;

  const total = kmPay + loadPay + stationPay + extraPay;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 flex flex-col justify-between">

      {/* ALGA – DIDELĖ IR AIŠKI */}
      <div className="bg-green-600 rounded-xl p-6 text-center mb-6 shadow-lg">
        <p className="text-sm uppercase tracking-wide">Tavo alga</p>
        <p className="text-5xl font-extrabold mt-2">
          {isNaN(total) ? '0.00' : total.toFixed(2)} €
        </p>
      </div>

      {/* ĮVESTYS */}
      <div className="space-y-4">
        <Input label="Nuvažiuoti km" value={km} setValue={setKm} />
        <Input
          label="Pakrovimai terminale (iškrovimai skaičiuojami automatiškai)"
          value={loads}
          setValue={setLoads}
        />
        <Input label="Degalinės" value={stations} setValue={setStations} />
        <Input label="Papildomas darbas (val.)" value={extraHours} setValue={setExtraHours} />
      </div>

      {/* DETALĖS */}
      <div className="mt-6 bg-gray-800 rounded-xl p-4 text-sm space-y-1">
        <Row text="KM atlygis" value={kmPay} />
        <Row text={`Pakrovimai + iškrovimai (${loadHours} val.)`} value={loadPay} />
        <Row text="Degalinės" value={stationPay} />
        <Row text="Papildomas darbas" value={extraPay} />
      </div>
    </main>
  );
}

/* ===== TIPAI ===== */

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
        onChange={e =>
          setValue(e.target.value === '' ? '' : Number(e.target.value))
        }
        className="w-full p-4 text-lg rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

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
