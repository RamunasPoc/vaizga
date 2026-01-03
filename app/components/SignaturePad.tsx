'use client';

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type Props = {
  signature: string | null;
  setSignature: (v: string | null) => void;
};

export default function SignaturePad({ signature, setSignature }: Props) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
    setSignature(null);
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty()) return;
    const dataUrl = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    if (dataUrl) setSignature(dataUrl);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Vairuotojo parašas</h3>
        {signature && (
          <button onClick={clear} className="text-xs text-red-400 hover:underline">
            Ištrinti ir pasirašyti iš naujo
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-inner">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: 'w-full h-32 cursor-crosshair',
          }}
          onEnd={save}
        />
      </div>
      <p className="text-[10px] text-gray-500 text-center uppercase">Pasirašykite pirštu aukščiau esančiame laukelyje</p>
    </div>
  );
}