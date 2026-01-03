'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Section from './components/Section';
import TextInput from './components/inputs/TextInput';
import NumberInput from './components/inputs/NumberInput';
import ExtraWorksSection from './components/ExtraWorksSection';
import HolidayWorksSection from './components/HolidayWorksSection'; // 1. Importuojame naują sekciją
import SalaryBreakdown from './components/SalaryBreakdown';
import SalaryHeader from './components/SalaryHeader';
import SalaryActions from './components/SalaryActions';
import HiddenReport from './components/HiddenReport';

import { useSalaryCalculator } from './hooks/useSalaryCalculator';

export default function Page() {
  const calc = useSalaryCalculator();

  // 📄 PDF generavimas
  const generatePDF = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2 });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(img, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`darbo-ataskaita-${calc.name}-${calc.surname}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6">
      {/* Header su bendru atlyginimu */}
      <SalaryHeader total={calc.total} />

      {/* Vairuotojas */}
      <Section title="Vairuotojas">
        <TextInput
          label="Vardas"
          value={calc.name}
          setValue={(v: string) => calc.setName(v)}
          icon="👤"
        />
        <TextInput
          label="Pavardė"
          value={calc.surname}
          setValue={(v: string) => calc.setSurname(v)}
          icon="👤"
        />
      </Section>

      {/* Pagrindiniai darbai */}
      <Section title="Pagrindiniai darbai">
        <NumberInput
          label="Nuvažiuoti km"
          value={calc.km}
          setValue={(v: number | '') => calc.setKm(v)}
          icon="🛣️"
        />
        <NumberInput
          label="Pakrovimai terminale"
          value={calc.loads}
          setValue={(v: number | '') => calc.setLoads(v)}
          icon="📦"
        />
        <NumberInput
          label="Degalinės"
          value={calc.stations}
          setValue={(v: number | '') => calc.setStations(v)}
          icon="⛽"
        />
      </Section>

      {/* Papildomi darbai */}
      <ExtraWorksSection
        extraWorks={calc.extraWorks}
        addExtraWork={calc.addExtraWork}
        updateExtraWork={calc.updateExtraWork}
        removeExtraWork={calc.removeExtraWork}
      />

      {/* 2. Pridedame Šventinių darbų sekciją čia */}
      <HolidayWorksSection
        holidayWorks={calc.holidayWorks}
        addHolidayWork={calc.addHolidayWork}
        updateHolidayWork={calc.updateHolidayWork}
        removeHolidayWork={calc.removeHolidayWork}
      />

      {/* Atlyginimo skaičiavimas */}
      <SalaryBreakdown
        kmPay={calc.kmPay}
        loadPay={calc.loadPay}
        stationPay={calc.stationPay}
        extraPay={calc.extraPay}
        // Patarimas: jei SalaryBreakdown dar neturi holidayPay, 
        // reikės jį pridėti huke ir perduoti čia
        holidayPay={calc.holidayPay} 
      />

      {/* Paslėpta ataskaita PDF */}
      <HiddenReport {...calc} />

      {/* Veiksmai */}
      <SalaryActions onGeneratePDF={generatePDF} />
    </main>
  );
}