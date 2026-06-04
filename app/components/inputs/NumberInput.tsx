'use client';

type Props = {
  label: string;
  value: number | '';
  setValue: (val: number | '') => void;
  icon?: string;
  placeholder?: string;
};

export default function NumberInput({ 
  label, 
  value, 
  setValue, 
  icon, 
  placeholder 
}: Props) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {/* Etiketė - padaryta kiek tamsesnė ir ryškesnė geresniam skaitomumui */}
      <label className="text-sm font-medium text-slate-700 ml-0.5">
        {label}
      </label>
      
      <div className="
        flex items-center 
        bg-white 
        px-3 py-2 
        rounded-xl 
        border border-slate-200 
        shadow-sm
        transition-all duration-200
        focus-within:ring-4 focus-within:ring-indigo-500/10 
        focus-within:border-indigo-500
      ">
        {/* Ikona - subtilesnė spalva */}
        {icon && (
          <span className="mr-2.5 text-lg grayscale opacity-70 group-focus-within:grayscale-0 transition-all">
            {icon}
          </span>
        )}
        
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            setValue(val === '' ? '' : Number(val));
          }}
          placeholder={placeholder || '0'}
          className="
            bg-transparent 
            flex-1 
            outline-none 
            text-slate-900 
            font-medium
            placeholder:text-slate-400
            w-full 
            [appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />
      </div>
    </div>
  );
}