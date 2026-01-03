'use client';

import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

type Props = {
  signature: string | null;
  setSignature: (v: string | null) => void;
};

export default function SignaturePad({ signature, setSignature }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  // Funkcija, kuri suveikia kaskart pakėlus pelę/pirštą
  const handleEnd = () => {
    if (sigRef.current) {
      // getTrimmedCanvas pašalina tuščius kraštus aplink parašą
      const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL('image/png');
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
          canvasProps={{
            className: 'signature-canvas w-full h-full cursor-crosshair touch-none',
          }}
          backgroundColor="rgb(255, 255, 255)"
        />
        {!signature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="text-gray-500 font-bold">Pasirašykite pelė arba pirštu</span>
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-500 mt-2 text-center">
        Galite atkelti pelę/pirštą ir tęsti.
      </p>
    </div>
  );
}