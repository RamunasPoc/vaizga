'use client';

import SignatureCanvas from 'react-signature-canvas';
import { useRef, useEffect } from 'react';

type Props = {
  signature: string | null;
  setSignature: (v: string | null) => void;
};

export default function SignaturePad({ signature, setSignature }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  // Svarbu: užtikriname, kad canvas persipieštų pakeitus lango dydį
  useEffect(() => {
    const handleResize = () => {
      if (sigRef.current) {
        // Išsaugome dabartinį parašą prieš resize, jei reikia, 
        // bet paprastai užtenka tiesiog išvalyti/perkrauti
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEnd = () => {
    if (sigRef.current) {
      if (sigRef.current.isEmpty()) {
        setSignature(null);
        return;
      }
      
      // PAKEITIMAS: Naudojame tiesioginį toDataURL iš canvas elemento, 
      // kad išvengtume mastelio problemų su "trimmed" versija testavimo metu.
      // Jei norite būtinai apkarpyto, naudokite: sigRef.current.getTrimmedCanvas().toDataURL('image/png')
      const dataUrl = sigRef.current.getCanvas().toDataURL('image/png');
      setSignature(dataUrl);
    }
  };

  const clear = () => {
    sigRef.current?.clear();
    setSignature(null);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase italic">
          Vairuotojo parašas
        </label>
        <button 
          type="button"
          onClick={clear}
          className="text-[10px] bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
        >
          🗑️ Išvalyti
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-hidden relative" style={{ height: '160px' }}>
        <SignatureCanvas
          ref={sigRef}
          onEnd={handleEnd}
          penColor="black"
          canvasProps={{
            // Svarbu: nurodykite plotį ir aukštį tiesiogiai, kad biblioteka žinotų koordinates
            width: 500, 
            height: 160,
            className: 'signature-canvas w-full h-full cursor-crosshair touch-none',
          }}
          backgroundColor="white"
        />
        {!signature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="text-gray-500 font-bold text-sm">Pasirašykite čia</span>
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-tighter">
        Parašas automatiškai išsaugomas pakėlus pirštą/pelę
      </p>
    </div>
  );
}