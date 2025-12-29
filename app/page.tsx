'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DriverSalaryCalculator() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>(''); // pakrovimai terminale
  const [stations, setStations] = useState<number | ''>('');

  const [extraWorkDesc, setExtraWorkDesc] = useState('');
  const [extraHours, setExtraHours] = useState<number | ''>(''); // papildomas darbas val.

  // Skaičiavimai
  const kmPay = km !== '' ? (Number(km) / 100) * 11 : 0;
  const loadHours = loads !== '' ? Number(loads) * 2 : 0; // pakrovimas + iškrovimas
  const loadPay = loadHours * 7.6;
  const stationPay = stations !== '' ? (Number(stations) * 20 / 60) * 7.6 : 0;
  const extraPay = extraHours !== '' ? Number(extraHours) * 7.6 : 0;

  const total = kmPay + loadPay + stationPay + extraPay;

  // PDF generavimas su html2canvas
  const generatePDF = async () => {
    const element = document.getElementById('report');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`darbo-ataskaita-${name}-${surname}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6">

      {/* ALGA */}
      <div className="bg-green-600 rounded-xl p-6 text-center">
        <p className="text-sm uppercase">Bendra alga</p>
        <p className="text-5xl font-bold">{total > 0 ? total.toFixed(2) : ''} €</p>
      </div>

      {/* Įvedimo laukai */}
      <Section title="Vairuotojas">
        <Input label="Vardas" value={name} setValue={setName} text />
        <Input label="Pavardė" value={surname} setValue={setSurname} text />
      </Section>

      <Section title="Pagrindiniai darbai">
        <Input label="Nuvažiuoti km" value={km} setValue={setKm} />
        <Input
          label="Pakrovimai terminale (iškrovimai automatiškai)"
          value={loads}
          setValue={setLoads}
        />
        <Input label="Degalinės" value={stations} setValue={setStations} />
      </Section>

      <Section title="Papildomi darbai">
        <Textarea
          label="Papildomų darbų aprašymas"
          value={extraWorkDesc}
          setValue={setExtraWorkDesc}
        />
        <Input
          label="Papildomo darbo valandos"
          value={extraHours}
          setValue={setExtraHours}
        />
      </Section>

      {/* PDF ataskaita (paslėpta, bet matoma html2canvas) */}
      <div
        id="report"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          backgroundColor: 'white',
          color: 'black',
          padding: '20px',
          width: '210mm',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>Vairuotojo darbo ataskaita</h1>
        <p>Vardas: {name || '-'}</p>
        <p>Pavardė: {surname || '-'}</p>
        <p>Nuvažiuoti km: {km !== '' ? km : '-'}</p>
        <p>Pakrovimai terminale: {loads !== '' ? loads : '-'} ({loadHours} val.)</p>
        <p>Degalinės: {stations !== '' ? stations : '-'}</p>
        <p>Papildomi darbai: {extraWorkDesc || '-'}</p>
        <p>Papildomo darbo valandos: {extraHours !== '' ? extraHours : '-'}</p>
        <p style={{ fontWeight: 'bold' }}>Bendra alga: {total.toFixed(2)} €</p>
      </div>

      {/* PDF mygtukas */}
      <button
        onClick={generatePDF}
        className="w-full bg-blue-600 p-4 rounded-xl text-lg font-bold"
      >
        📄 Generuoti PDF
      </button>
    </main>
  );
}

/* ===== KOMPONENTAI ===== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

interface InputProps {
  label: string;
  value: any;
  setValue: Dispatch<SetStateAction<any>>;
  text?: boolean;
}

function Input({ label, value, setValue, text }: InputProps) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        type={text ? 'text' : 'number'}
        value={value}
        placeholder={text ? 'Įveskite tekstą' : 'Įveskite skaičių'}
        onChange={e =>
          setValue(text ? e.target.value : e.target.value === '' ? '' : Number(e.target.value))
        }
        className="w-full p-3 rounded bg-gray-700 text-black"
      />
    </div>
  );
}

function Textarea({ label, value, setValue }: InputProps) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full p-3 rounded bg-gray-700 text-black"
        rows={3}
      />
    </div>
  );
}
