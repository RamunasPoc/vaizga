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
import SignaturePad from './components/SignaturePad';

import { useSalaryCalculator } from './hooks/useSalaryCalculator';

export default function Page() {
  const calc = useSalaryCalculator();

  // 📄 1. Funkcija PDF atsisiuntimui (archyvui)
  const generatePDF = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const img = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(img, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`ataskaita-${calc.name || 'vairuotojas'}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // 📲 2. Funkcija dalinimuisi (WhatsApp / Viber)
  const handleShare = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    try {
      const canvas = await html2canvas(el, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff' 
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const fileName = `ataskaita-${calc.name || 'vairuotojas'}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // Tikriname, ar įrenginys palaiko dalinimąsi failais (Web Share API)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Darbo ataskaita',
            text: `Vairuotojo ${calc.name} ${calc.surname} darbo ataskaita`,
          });
        } else {
          // Jei nepalaiko, tiesiog atsisiunčiame PDF
          generatePDF();
          alert("Dalinimasis nepalaikomas šioje naršyklėje. Ataskaita sugeneruota kaip PDF.");
        }
      }, 'image/png');
    } catch (error) {
      console.error('Dalinimosi klaida:', error);
      alert("Nepavyko pasidalinti ataskaita.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6 pb-10">
      <SalaryHeader total={calc.total} />

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

      <Section title="Pagrindiniai darbai">
        <NumberInput
          label="Nuvažiuoti km"
          value={calc.km}
          setValue={(v: number | '') => calc.setKm(v)}
          icon="🛣️"
        />
        <NumberInput
          label="Pakrovimai terminale (vnt.)"
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

      <ExtraWorksSection
        extraWorks={calc.extraWorks}
        addExtraWork={calc.addExtraWork}
        updateExtraWork={calc.updateExtraWork}
        removeExtraWork={calc.removeExtraWork}
      />

      <HolidayWorksSection
        holidayWorks={calc.holidayWorks}
        addHolidayWork={calc.addHolidayWork}
        updateHolidayWork={calc.updateHolidayWork}
        removeHolidayWork={calc.removeHolidayWork}
      />

      {/* 🖋️ Parašo padėkliukas */}
      <Section title="Patvirtinimas">
        <SignaturePad 
          signature={calc.signature} 
          setSignature={calc.setSignature} 
        />
      </Section>

      <SalaryBreakdown
        kmPay={calc.kmPay}
        loadPay={calc.loadPay}
        stationPay={calc.stationPay}
        extraPay={calc.extraPay}
        holidayPay={calc.holidayPay} 
      />

      {/* Šablonas generavimui (nematomas ekrane) */}
      <HiddenReport {...calc} />

      {/* 🟢 Mygtukai: PDF ir Dalintis */}
      <SalaryActions 
        onGeneratePDF={generatePDF} 
        onShare={handleShare} 
      />
      
      <p className="text-center text-gray-600 text-[10px] pt-4 uppercase tracking-widest">
        v1.4 | Pilnas funkcionalumas paruoštas
      </p>
    </main>
  );
}