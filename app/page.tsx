'use client';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Section from './components/Section';
import TextInput from './components/inputs/TextInput';
import NumberInput from './components/inputs/NumberInput';
import ExtraWorksSection from './components/ExtraWorksSection';
import HolidayWorksSection from './components/HolidayWorksSection';
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
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6 pb-10">
      {/* Header su bendru atlyginimu - gali pridėti 'sticky top-0 z-10', jei nori, kad sektų vaizdą */}
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
          label="Pakrovimai terminale (2 val.)"
          value={calc.loads}
          setValue={(v: number | '') => calc.setLoads(v)}
          icon="📦"
        />
        
        <div className="space-y-1">
          <NumberInput
            label="Degalinės (20 min.)"
            value={calc.stations}
            setValue={(v: number | '') => calc.setStations(v)}
            icon="⛽"
          />
          {calc.stations !== '' && Number(calc.stations) > 0 && (
            <p className="text-[10px] text-blue-400 ml-12 italic animate-pulse">
              ⏱️ Sukaupta laiko: {(Number(calc.stations) * 20 / 60).toFixed(2)} val.
            </p>
          )}
        </div>
      </Section>

      {/* Papildomi darbai (Interaktyvūs su animacijomis) */}
      <ExtraWorksSection
        extraWorks={calc.extraWorks}
        addExtraWork={calc.addExtraWork}
        updateExtraWork={calc.updateExtraWork}
        removeExtraWork={calc.removeExtraWork}
      />

      {/* Šventinių darbų sekcija (Interaktyvi su x2 indikacija) */}
      <HolidayWorksSection
        holidayWorks={calc.holidayWorks}
        addHolidayWork={calc.addHolidayWork}
        updateHolidayWork={calc.updateHolidayWork}
        removeHolidayWork={calc.removeHolidayWork}
      />

      {/* Algos sudėtis (Suskirstymas) */}
      <SalaryBreakdown
        kmPay={calc.kmPay}
        loadPay={calc.loadPay}
        stationPay={calc.stationPay}
        extraPay={calc.extraPay}
        holidayPay={calc.holidayPay} 
      />

      {/* Paslėpta ataskaita skirta html2canvas */}
      <HiddenReport {...calc} />

      {/* Veiksmai: PDF generavimas ir kt. */}
      <SalaryActions onGeneratePDF={generatePDF} />
      
      <p className="text-center text-gray-600 text-[10px] pt-4">
        v1.2 | PWA paruošta naudojimui neprisijungus
      </p>
    </main>
  );
}