'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  value: number | '';
  setValue: Dispatch<SetStateAction<number | ''>>;
}

export default function NumberInput({ label, value, setValue }: Props) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e =>
          setValue(e.target.value === '' ? '' : Number(e.target.value))
        }
        className="w-full p-3 rounded bg-white text-black border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
