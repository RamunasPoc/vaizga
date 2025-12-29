'use client';
import { useState, Dispatch, SetStateAction } from 'react';
import jsPDF from 'jspdf';

export default function DriverSalaryCalculator() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>(''); // pakrovimai terminale
  const [stations, setStations] = useState<number | ''>('');

  const [extraWorkDesc, setExtraWorkDesc] = useState('');
  const [extraHours, setExtraHours] = useState<number | ''>(''); // papildomas darbas val.

  // Skaičiavimai su patikrinimu, kad tuščias laukas netaptų 0
  const kmPay = km !== '' ? (Number(km) / 100) * 11 : 0;
  const loadHours = loads !== '' ? Number(loads) * 2 : 0; // pakrovimas + iškrovimas
  const loadPay = loadHours * 7.6;
  const stationPay = stations !== '' ? (Number(stations) * 20 / 60) * 7.6 : 0;
  const extraPay = extraHours !== '' ? Number(extraHours) * 7.6 : 0;

  const total = kmPay + loadPay + stationPay + extraPay;

  // PDF generavimas su paprastu fontu helvetica (palaiko UTF-8)
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    doc.setFontSize(16);
    doc.text("Vairuotojo darbo ataskaita", 20, 20);

    doc.setFontSize(12);
    doc.text(`Vardas: ${name || '-'}`, 20, 35);
    doc.text(`Pavardė: ${surname || '-'}`, 20, 43);

    doc.text(`Nuvažiuoti km: ${km !== '' ? km : '-'}`, 20, 60);
    doc.text(
      `Pakrovimai terminale: ${loads !== '' ? loads : '-'} (${loadHours} val.)`,
      20,
      68
    );
    doc.text(`Degalinės: ${stations !== '' ? stations : '-'}`, 20, 76);

    doc.text("Papildomi darbai:", 20, 92);
    doc.text(extraWorkDesc || "-", 20, 100);
    doc.text(
      `Papildomo darbo valandos: ${extraHours !== '' ? extraHours : '-'}`,
      20,
      112
    );

    doc.setFontSize(14);
    doc.text(`Bendra alga: ${total.toFixed(2)} €`, 20, 130);

    doc.save(`darbo-ataskaita-${name}-${surname}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6">

      {/* ALGA */}
      <div className="bg-green-600 rounded-xl p-6 text-center">
        <p className="text-sm uppercase">Bendra alga</p>
        <p className="text-5xl font-bold">{total > 0 ? total.toFixed(2) : ''} €</p>
      </div>

      {/* VARDAS PAVARDĖ */}
      <Section title="Vairuotojas">
        <Input label="Vardas" value={name} setValue={setName} text />
        <Input label="Pavardė" value={surname} setValue={setSurname} text />
      </Section>

      {/* PAGRINDINIAI DARBAI */}
      <Section title="Pagrindiniai darbai">
        <Input label="Nuvažiuoti km" value={km} setValue={setKm} />
        <Input
          label="Pakrovimai terminale (iškrovimai automatiškai)"
          value={loads}
          setValue={setLoads}
        />
        <Input label="Degalinės" value={stations} setValue={setStations} />
      </Section>

      {/* PAPILDOMI DARBAI */}
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

      {/* PDF */}
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
        className="w-full p-3 rounded bg-gray-700"
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
        className="w-full p-3 rounded bg-gray-700"
        rows={3}
      />
    </div>
  );
}
