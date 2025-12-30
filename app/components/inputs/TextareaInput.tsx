'use client';

import { Dispatch, SetStateAction } from 'react';

interface Props {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  icon?: string;
}

export default function TextareaInput({
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
          <span className="absolute left-3 top-3 text-gray-400">
            {icon}
          </span>
        )}

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="Aprašykite atliktus darbus"
          className={`
            w-full p-3 rounded-xl
            bg-gray-800
            text-white
            placeholder-gray-400
            border border-gray-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            resize-none
            ${icon ? 'pl-10' : ''}
          `}
        />
      </div>
    </div>
  );
}
