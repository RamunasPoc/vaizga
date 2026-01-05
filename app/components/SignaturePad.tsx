'use client';

import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

type Props = {
  signature: string | null;
  setSignature: (v: string | null) => void;
};

export default function SignaturePad({ signature, setSignature }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  const handleEnd = () => {
    if (sigRef.current) {
      if (sigRef.current.isEmpty()) {
        setSignature(null);
        return;
      }
      
      // Naudojame pilną drobę (getCanvas), kad išsaugotume poziciją centre.
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

      <div className="bg-white rounded-xl overflow-hidden relative h-[160px]">
        <SignatureCanvas
          ref={sigRef}
          onEnd={handleEnd}
          penColor="black"
          // Ištaisyta: minPixelRatio bibliotekoje nustatomas per canvasProps arba ne visose versijose palaikomas.
          // Saugiausia skaidrų foną palikti čia:
          backgroundColor="rgba(255, 255, 255, 0)"
          canvasProps={{
            className: 'signature-canvas w-full h-full cursor-crosshair touch-none',
            // Kai kurios versijos priima ratio čia:
            // @ts-ignore (jei vis tiek meta klaidą, tiesiog ištrinkite šią eilutę)
            minPixelRatio: 1
          }}
        />
        {!signature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            {/* Ištaisyta: pašalintas text-black konfliktas, paliktas tik text-gray-500 */}
            <span className="text-gray-500 font-bold text-sm uppercase">Pasirašykite centre</span>
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-500 mt-2 text-center uppercase tracking-tighter">
        Parašas automatiškai išsaugomas 
      </p>
    </div>
  );
}