'use client';

type Props = {
  label: string;
  value: number | '';
  setValue: (val: number | '') => void;
  icon?: string;
  placeholder?: string; // Pridėta savybė, kad išvengtume TS klaidų
};

export default function NumberInput({ 
  label, 
  value, 
  setValue, 
  icon, 
  placeholder 
}: Props) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm text-gray-400 ml-1">{label}</label>
      <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-gray-600 focus-within:border-blue-500 transition-colors">
        {icon && <span className="mr-2 text-xl">{icon}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            // Jei laukas tuščias, nustatome '', kitaip konvertuojame į skaičių
            setValue(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder}
          className="bg-transparent flex-1 outline-none text-white p-2 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
}