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
      
      // Išsaugome su balta drobe, kad PDF atrodytų gerai
      const dataUrl = sigRef.current.getCanvas().toDataURL('image/png');
      setSignature(dataUrl);
    }
  };

  const clear = () => {
    sigRef.current?.clear();
    setSignature(null);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span className="text-indigo-500 text-base">✒️</span> Vairuotojo parašas
        </label>
        
        <button 
          type="button"
          onClick={clear}
          className="text-[10px] font-bold uppercase tracking-wide text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <span>✕</span> Išvalyti
        </button>
      </div>

      <div className="bg-slate-50 rounded-xl overflow-hidden relative h-[180px] border border-slate-100 ring-1 ring-inset ring-slate-200/50">
        {/* Subtili pagalbinė linija pasirašymui */}
        <div className="absolute left-10 right-10 bottom-12 h-[1px] bg-slate-300/50 pointer-events-none" />

        <SignatureCanvas
          ref={sigRef}
          onEnd={handleEnd}
          penColor="#0f172a" // Slate-900 spalva (profesionaliau nei gryna juoda)
          backgroundColor="rgba(255, 255, 255, 0)"
          canvasProps={{
            className: 'signature-canvas w-full h-full cursor-crosshair touch-none',
          }}
        />

        {!signature && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300">
            <span className="text-slate-400 font-medium text-xs uppercase tracking-widest opacity-60">
              Pasirašykite čia
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${signature ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
          {signature ? 'Parašas užfiksuotas' : 'Laukiama parašo...'}
        </p>
      </div>
    </div>
  );
}