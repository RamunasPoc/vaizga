'use client';

type Props = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  icon?: string;
  placeholder?: string; // Pridėta papildoma savybė
};

export default function TextInput({ label, value, setValue, icon, placeholder }: Props) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {/* Etiketė - tamsesnė pilka geresniam kontrastui */}
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
        {/* Ikona - subtili ir priderinta */}
        {icon && (
          <span className="mr-2.5 text-lg opacity-70 grayscale">
            {icon}
          </span>
        )}
        
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || `Įveskite...`}
          className="
            bg-transparent 
            flex-1 
            outline-none 
            text-slate-900 
            font-medium
            placeholder:text-slate-400
            text-sm
            py-1
            w-full
          "
        />
      </div>
    </div>
  );
}