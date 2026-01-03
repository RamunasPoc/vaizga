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

  // 🗑️ Išvalyti viską
  const handleReset = () => {
    if (window.confirm("Ar tikrai norite išvalyti visus įvestus duomenis?")) {
      window.location.reload();
    }
  };

  // 📄 Generuoti PDF
  const generatePDF = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    // Pauzė užtikrina, kad visi elementai (įskaitant parašą, jei jis yra) pasikrautų
    await new Promise(r => setTimeout(r, 300));

    const canvas = await html2canvas(el, { 
      scale: 2, 
      useCORS: true,
      logging: false 
    });
    
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(img, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`ataskaita-${calc.name || 'vairuotojas'}.pdf`);
  };

  // 📲 Dalintis (PNG formatu geriausiam suderinamumui)
  const handleShare = async () => {
    const el = document.getElementById('report');
    if (!el) return;

    try {
      // Palaukiame akimirką, kol paslėptas DOM susirendina
      await new Promise(r => setTimeout(r, 300));

      const canvas = await html2canvas(el, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#ffffff' 
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `ataskaita.png`, { type: 'image/png' });

        // Naudojame Web Share API
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Darbo ataskaita',
            text: `Vairuotojo ${calc.name} ${calc.surname} ataskaita`,
          });
        } else {
          // Jei dalintis neleidžia (pvz. senas telefonas), atsisiunčiame PDF
          generatePDF();
        }
      }, 'image/png');
    } catch (error) {
      console.error('Klaida dalinantis:', error);
      alert("Nepavyko pasidalinti. Pabandykite atsisiųsti PDF.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 space-y-6 pb-10">
      <SalaryHeader total={calc.total} />

      <Section title="Vairuotojas">
        <TextInput label="Vardas" value={calc.name} setValue={calc.setName} icon="👤" />
        <TextInput label="Pavardė" value={calc.surname} setValue={calc.setSurname} icon="👤" />
      </Section>

      <Section title="Pagrindiniai darbai">
        <NumberInput label="Nuvažiuoti km" value={calc.km} setValue={calc.setKm} icon="🛣️" />
        <NumberInput label="Pakrovimai terminale" value={calc.loads} setValue={calc.setLoads} icon="📦" />
        <div className="space-y-1">
          <NumberInput label="Degalinės (20 min.)" value={calc.stations} setValue={calc.setStations} icon="⛽" />
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

      {/* Paslėptas komponentas PDF generavimui */}
      <HiddenReport {...calc} />

      <SalaryActions 
        onGeneratePDF={generatePDF} 
        onShare={handleShare} 
        onReset={handleReset}
      />
      
      <p className="text-center text-gray-600 text-[10px] pt-4 uppercase tracking-widest">
        v1.6 – Vaizga App)
      </p>
    </main>
  );
}