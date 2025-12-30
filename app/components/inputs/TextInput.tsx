'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function TextInput({ label, value, setValue }: Props) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full p-3 rounded bg-white text-black border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
