'use client';

import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

// Čia svarbu, kad SignaturePad leistų atkelti pirštą ir tęsti
export default function SignaturePad({ signature, setSignature }: { signature: string | null, setSignature: (v: string | null) => void }) {
  const sigRef = useRef<any>(null);

  // Kiekvieną kartą pakėlus pirštą, išsaugome rezultatą
  const handleEnd = () => {
    if (sigRef.current) {
      setSignature(sigRef.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  // Išvalymo funkcija išvalo ir canvas, ir jūsų duomenis
  const clear = () => {
    sigRef.current?.clear();
    setSignature(null);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase italic">Vairuotojo parašas</label>
        {/* Čia yra Jūsų prašytas išvalymo mygtukas */}
        <button 
          onClick={clear} 
          className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition-colors shadow-sm"
        >
          🗑️ Išvalyti parašą
        </button>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-inner border-2 border-transparent focus-within:border-blue-500 relative">
        <SignatureCanvas
          ref={sigRef}
          onEnd={handleEnd}
          canvasProps={{ 
            // touch-none yra kritinis mobilyje, kad nejudėtų ekranas piešiant
            className: 'w-full h-40 cursor-crosshair touch-none',
            style: { width: '100%', height: '160px' } 
          }}
        />
        {!signature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-300 text-xl font-bold opacity-50 rotate-[-5deg]">Pasirašykite čia</span>
          </div>
        )}
      </div>
      
      <p className="text-[10px] text-gray-500 mt-2 text-center italic">
        Galite atkelti pirštą ir tęsti. Norėdami perrašyti, spauskite "Išvalyti".
      </p>
    </div>
  );
}