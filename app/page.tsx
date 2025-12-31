'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Section from './components/Section';
import SalaryHeader from './components/SalaryHeader';
import TextInput from './components/inputs/TextInput';
import NumberInput from './components/inputs/NumberInput';
import TextareaInput from './components/inputs/TextareaInput';
import HiddenReport from './components/HiddenReport';
import SalaryBreakdown from './components/SalaryBreakdown';

export default function Page() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>('');
  const [stations, setStations] = useState<number | ''>('');

  const [extraWorkDesc, setExtraWorkDesc] = useState('');
  const [extraHours, setExtraHours] = useState<number | ''>('');

  // Algų skaičiavimai
  const kmPay = km !== '' ? (Number(km) / 100) * 11.4 : 0;
  const loadHours = loads !== '' ? Number(loads) * 2 : 0; // pakrovimas + iškrovimas
  const loadPay = loadHours * 7.6;
  const stationPay = stations !== '' ? (Number(stations) * 20 / 60) * 7.6 : 0;
  const extraPay = extraHours !== '' ? Number(extraHours) * 7.6 : 0;

  const total = kmPay + loadPay + stationPay + extraPay;

  // PDF generavimas
  const generatePDF = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;

    pdf.addImage(img, 'PNG', 0, 0, w, h);
    pdf.save(`darbo-ataskaita-${name}-${surname}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6">
      <SalaryHeader total={total} />

      {/* Vairuotojas */}
      <Section title="Vairuotojas">
        <TextInput label="Vardas" value={name} setValue={setName} icon="👤" />
        <TextInput label="Pavardė" value={surname} setValue={setSurname} icon="👤" />
      </Section>

      {/* Pagrindiniai darbai */}
      <Section title="Pagrindiniai darbai">
        <NumberInput label="Nuvažiuoti km" value={km} setValue={setKm} icon="🛣️" />
        <NumberInput
          label="Pakrovimai terminale"
          value={loads}
          setValue={setLoads}
          icon="📦"
        />
        <NumberInput label="Degalinės" value={stations} setValue={setStations} icon="⛽" />
      </Section>

      {/* Papildomi darbai */}
      <Section title="Papildomi darbai">
        <TextareaInput
          label="Papildomų darbų aprašymas"
          value={extraWorkDesc}
          setValue={setExtraWorkDesc}
          icon="📝"
        />
        <NumberInput
          label="Papildomo darbo valandos"
          value={extraHours}
          setValue={setExtraHours}
          icon="⏱️"
        />
      </Section>

      {/* Algos sudėtis */}
      <SalaryBreakdown
        kmPay={kmPay}
        loadPay={loadPay}
        stationPay={stationPay}
        extraPay={extraPay}
      />

      {/* Paslėptas PDF ataskaitos komponentas */}
      <HiddenReport
        name={name}
        surname={surname}
        km={km}
        loads={loads}
        stations={stations}
        extraWorkDesc={extraWorkDesc}
        extraHours={extraHours}
        loadHours={loadHours}
        total={total}
        kmPay={kmPay}
        loadPay={loadPay}
        stationPay={stationPay}
        extraPay={extraPay}
      />

      {/* PDF mygtukas */}
      <button
        onClick={generatePDF}
        className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-lg font-bold"
      >
        📄 Generuoti PDF
      </button>
    </main>
  );
}
