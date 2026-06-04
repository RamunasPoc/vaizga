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

    const sigImg = el.querySelector('img') as HTMLImageElement;
    if (sigImg && sigImg.src) {
      await new Promise((resolve) => {
        if (sigImg.complete) resolve(true);
        sigImg.onload = () => resolve(true);
        sigImg.onerror = () => resolve(true);
      });
    }

    await new Promise(r => setTimeout(r, 500));

    try {
      return await html2canvas(el, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const reportEl = clonedDoc.getElementById(elementId);
          if (reportEl) {
            reportEl.style.position = 'relative';
            reportEl.style.left = '0';
            reportEl.style.opacity = '1';
            reportEl.style.visibility = 'visible';
            reportEl.style.display = 'block';
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
          generatePDF();
        }
      }, 'image/png');
    } catch (error) {
      generatePDF();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Centrinis konteineris tvarkingam išdėstymui */}
      <div className="max-w-3xl mx-auto space-y-8 pb-10">
        
        <SalaryHeader total={calc.total} />

        <Section title="Vairuotojas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Vardas" value={calc.name} setValue={calc.setName} icon="👤" />
            <TextInput label="Pavardė" value={calc.surname} setValue={calc.setSurname} icon="👤" />
          </div>
        </Section>

        <Section title="Pagrindiniai darbai">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NumberInput label="Nuvažiuoti km" value={calc.km} setValue={calc.setKm} icon="🛣️" />
            <NumberInput label="Pakrovimai terminale" value={calc.loads} setValue={calc.setLoads} icon="📦" />
            <NumberInput label="Degalinės (20 min.)" value={calc.stations} setValue={calc.setStations} icon="⛽" />
          </div>
        </Section>

        <Section title="Darbo sąlygos ir priedai">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Naktinės pamainos (22:00-06:00)"
              value={calc.nightShifts}
              setValue={calc.setNightShifts}
              icon="🌙"
              placeholder="Kiek naktų dirbta..."
            />
            <NumberInput
              label="Nakvynės vilkike"
              value={calc.sleepOvers}
              setValue={calc.setSleepOvers}
              icon="🛌"
              placeholder="Kiek naktų miegota..."
            />
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
            <span className="text-indigo-500 bg-indigo-50 w-5 h-5 flex items-center justify-center rounded-full font-bold">ℹ</span>
            Už kiekvieną naktinę pamainą ir nakvynę pridedama po 20.00 €.
          </p>
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
          nightPay={calc.nightPay}
          sleepPay={calc.sleepPay} 
        />

        {/* Paslėpta ataskaita generavimui */}
        <HiddenReport {...calc} />

        <SalaryActions 
          onGeneratePDF={generatePDF} 
          onShare={handleShare} 
          onReset={handleReset}
        />
        
      </div>
    </main>
  );
}