// components/SignaturePad.tsx
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react';

export default function SignaturePad({ signature, setSignature }: { signature: string | null, setSignature: (v: string | null) => void }) {
  const sigRef = useRef<any>(null);

  const handleEnd = () => {
    if (sigRef.current) {
      // Svarbu: naudojame PNG formatą
      setSignature(sigRef.current.getTrimmedCanvas().toDataURL('image/png'));
    }
  };

  const clear = () => {
    sigRef.current?.clear();
    setSignature(null);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase italic">Vairuotojo parašas</label>
        {signature && (
          <button 
            onClick={clear} 
            className="text-[10px] bg-red-900/30 text-red-400 px-2 py-1 rounded-md border border-red-900/50 hover:bg-red-900/50 transition-colors"
          >
            ✕ Pasirašyti iš naujo
          </button>
        )}
      </div>
      <div className="bg-white rounded-xl overflow-hidden shadow-inner border-2 border-transparent focus-within:border-blue-500">
        <SignatureCanvas
          ref={sigRef}
          onEnd={handleEnd}
          canvasProps={{ 
            className: 'w-full h-40 cursor-crosshair',
            style: { display: 'block' } // Užtikrina, kad canvas nebūtų 0px aukščio
          }}
        />
      </div>
      {!signature && (
        <p className="text-[10px] text-gray-500 mt-2 text-center italic">
          Pasirašykite aukščiau esančiame baltame laukelyje
        </p>
      )}
    </div>
  );
}