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

  const handleReset = () => {
    if (window.confirm("Ar tikrai norite išvalyti visus įvestus duomenis?")) {
      window.location.reload();
    }
  };

  /**
   * Patobulinta Canvas generavimo funkcija
   */
  const generateCanvas = async (elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el) return null;

    // 1. Suteikiame daugiau laiko (800ms) MacBook/Retina ekranams apdoroti parašą
    await new Promise(r => setTimeout(r, 800));

    try {
      return await html2canvas(el, { 
        scale: 2, // Aukšta kokybė
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 0, // Priverčia laukti visų paveikslėlių (parašo) krovimo
        removeContainer: true,
        // Užtikriname, kad klonuotame vaizde parašas būtų matomas
        onclone: (clonedDoc) => {
          const reportEl = clonedDoc.getElementById(elementId);
          if (reportEl) {
            reportEl.style.position = 'static';
            reportEl.style.left = '0';
          }
          // Priverstinai surandame visus img elementus (parašą)
          const imgs = clonedDoc.getElementsByTagName('img');
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.display = 'block';
            imgs[i].style.visibility = 'visible';
          }
        }
      });
    } catch (err) {
      console.error("Canvas generavimo klaida:", err);
      return null;
    }
  };

  const generatePDF = async () => {
    if (!calc.signature) {
      if (!window.confirm("Ataskaita nepasirašyta. Ar generuoti PDF be parašo?")) return;
    }

    try {
      const canvas = await generateCanvas('report');
      if (!canvas) return;
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      pdf.save(`ataskaita-${calc.name || 'vairuotojas'}.pdf`);
    } catch (e) {
      alert("Nepavyko sugeneruoti PDF. Pabandykite dar kartą.");
    }
  };

  const handleShare = async () => {
    if (!calc.signature) {
      if (!window.confirm("Ataskaita nepasirašyta. Ar tikrai siųsti be parašo?")) return;
    }

    try {
      const canvas = await generateCanvas('report');
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `ataskaita.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Darbo ataskaita',
            text: `Vairuotojo ${calc.name} ${calc.surname} ataskaita`,
          });
        } else {
          generatePDF();
        }
      }, 'image/png', 1.0);
    } catch (error) {
      alert("Dalintis nepavyko. Sugeneruotas PDF atsisiuntimui.");
      generatePDF();
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
        <NumberInput label="Degalinės (20 min.)" value={calc.stations} setValue={calc.setStations} icon="⛽" />
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

      {/* Svarbu: HiddenReport turi būti DOM'e, bet išstumtas iš vaizdo lauko */}
      <HiddenReport {...calc} />

      <SalaryActions 
        onGeneratePDF={generatePDF} 
        onShare={handleShare} 
        onReset={handleReset}
      />
      
      <p className="text-center text-gray-600 text-[10px] pt-4 uppercase tracking-widest">
        v1.8 | Vaizga App
      </p>
    </main>
  );
}