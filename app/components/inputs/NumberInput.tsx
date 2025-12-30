'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  value: number | '';
  setValue: Dispatch<SetStateAction<number | ''>>;
  icon?: string; // km | € | ⏱
}

export default function NumberInput({
  label,
  value,
  setValue,
  icon,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-300">{label}</label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {icon}
          </span>
        )}

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) =>
            setValue(e.target.value === '' ? '' : Number(e.target.value))
          }
          placeholder="0"
          className={`
            w-full p-3 rounded-xl
            bg-gray-800
            text-white
            placeholder-gray-500
            border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${icon ? 'pl-10' : ''}
          `}
        />
      </div>
    </div>
  );
}
