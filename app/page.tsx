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
   * Patobulinta Canvas generavimo funkcija su "Force Load" parašui
   */
  const generateCanvas = async (elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el) return null;

    // 1. Surandame parašą ir priverstinai patikriname, ar jis įkrautas
    const sigImg = el.querySelector('img') as HTMLImageElement;
    if (sigImg && sigImg.src) {
      // Priverstinis laukimas, kol vaizdas bus paruoštas piešimui
      await new Promise((resolve) => {
        if (sigImg.complete) resolve(true);
        sigImg.onload = () => resolve(true);
        sigImg.onerror = () => resolve(true);
      });
    }

    // 2. Dar papildoma pauzė MacBook ekranams
    await new Promise(r => setTimeout(r, 500));

    try {
      return await html2canvas(el, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 15000, // Leidžiame iki 15s paveikslėliams įkrauti
        onclone: (clonedDoc) => {
          const reportEl = clonedDoc.getElementById(elementId);
          if (reportEl) {
            // Svarbu: Pakeičiame stilių klone, kad jis būtų "matomas" html2canvas
            reportEl.style.position = 'relative';
            reportEl.style.left = '0';
            reportEl.style.opacity = '1';
            reportEl.style.visibility = 'visible';
            reportEl.style.display = 'block';
          }
          
          // Priverstinai surandame parašo img klonuotame dokumente
          const images = clonedDoc.getElementsByTagName('img');
          for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'block';
            images[i].style.visibility = 'visible';
            images[i].style.opacity = '1';
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
      // Apskaičiuojame aukštį, kad jis neviršytų A4 lapo, bet išlaikytų proporcijas
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save(`ataskaita-${calc.name || 'vairuotojas'}.pdf`);
    } catch (e) {
      alert("Nepavyko sugeneruoti PDF.");
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
          // Jei dalinimosi nėra (pvz. kompiuteryje), siūlome PDF
          generatePDF();
        }
      }, 'image/png');
    } catch (error) {
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

      {/* Svarbu: HiddenReport stilius turi būti opacity 0.01, o ne display none */}
      <HiddenReport {...calc} />

      <SalaryActions 
        onGeneratePDF={generatePDF} 
        onShare={handleShare} 
        onReset={handleReset}
      />
      
      <p className="text-center text-gray-600 text-[10px] pt-4 uppercase tracking-widest">
        v1.9 | Vaizga App
      </p>
    </main>
  );
}