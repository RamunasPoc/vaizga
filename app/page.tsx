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

  // 🛠️ Pagalbinė funkcija, paruošianti canvas
  // Ji užtikrina, kad parašas tikrai matysis nuotraukoje
  const generateCanvas = async (elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el) return null;

    // 1. Pauzė: leidžiame React atnaujinti DOM (pvz. įdėti parašą)
    await new Promise(r => setTimeout(r, 500));

    // 2. Generavimas su specialiais nustatymais vaizdams
    return await html2canvas(el, { 
      scale: 2, 
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Ši dalis kritinė, kad parašas nedingtų:
      onclone: (clonedDoc) => {
        const images = clonedDoc.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
          images[i].style.display = 'block'; 
        }
      }
    });
  };

  // 📄 Generuoti PDF
  const generatePDF = async () => {
    // Jei nėra parašo, paklausiame, bet leidžiame tęsti
    if (!calc.signature) {
      const proceed = window.confirm("Ataskaita nepasirašyta. Ar generuoti PDF be parašo?");
      if (!proceed) return;
    }

    try {
      const canvas = await generateCanvas('report');
      if (!canvas) return;
      
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(img, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save(`ataskaita-${calc.name || 'vairuotojas'}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Įvyko klaida generuojant PDF.");
    }
  };

  // 📲 Dalintis
  const handleShare = async () => {
    // Jei nėra parašo, paklausiame
    if (!calc.signature) {
      const proceed = window.confirm("Ataskaita nepasirašyta. Ar tikrai siųsti be parašo?");
      if (!proceed) return;
    }

    try {
      const canvas = await generateCanvas('report');
      if (!canvas) return;

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
          // Jei telefonas nepalaiko dalinimosi failais, siūlome PDF
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
        {/* Čia naudojamas naujasis SignaturePad su išvalymo mygtuku */}
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

      {/* Paslėptas komponentas, kuris priima visus duomenis + parašą */}
      <HiddenReport {...calc} />

      <SalaryActions 
        onGeneratePDF={generatePDF} 
        onShare={handleShare} 
        onReset={handleReset}
      />
      
      <p className="text-center text-gray-600 text-[10px] pt-4 uppercase tracking-widest">
        v1.7 | Vaizga App
      </p>
    </main>
  );
}