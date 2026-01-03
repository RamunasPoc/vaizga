// components/SignaturePad.tsx
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useEffect } from 'react';

export default function SignaturePad({ signature, setSignature }: { signature: string | null, setSignature: (v: string | null) => void }) {
  const sigRef = useRef<any>(null);

  // Funkcija, kuri paima parašą ir perduoda į būseną
  const saveSignature = () => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
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
        <label className="text-xs font-bold text-gray-400 uppercase italic">Vairuotojo parašas</label>
        {signature && (
          <button 
            type="button"
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
          // Naudojame onEnd, kad išsaugotume, kai žmogus pakelia pirštą/pelę
          onEnd={saveSignature}
          // Išvalome klaidų tikimybę pridedant tuščią onBegin
          onBegin={() => {}}
          canvasProps={{ 
            className: 'w-full h-40 cursor-crosshair touch-none', // touch-none neleidžia puslapiui slinkti pasirašant
            style: { display: 'block', width: '100%', height: '160px' }
          }}
        />
      </div>

      {!signature ? (
        <p className="text-[10px] text-orange-400 mt-2 text-center font-bold animate-pulse">
          ☝️ BRAUKITE ČIA, KAD PASIRAŠYTUMĖTE
        </p>
      ) : (
        <p className="text-[10px] text-green-500 mt-2 text-center font-bold">
          ✅ Parašas užfiksuotas
        </p>
      )}
    </div>
  );
}