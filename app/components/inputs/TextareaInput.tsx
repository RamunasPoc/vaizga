'use client';

type Props = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  icon?: string;
  placeholder?: string; // Pridėjau placeholder galimybę
};

export default function TextareaInput({ label, value, setValue, icon, placeholder }: Props) {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {/* Etiketė - modernus slate atspalvis */}
      <label className="text-sm font-medium text-slate-700 ml-0.5">
        {label}
      </label>

      <div className="
        flex items-start 
        bg-white 
        px-3 py-2.5 
        rounded-xl 
        border border-slate-200 
        shadow-sm
        transition-all duration-200
        focus-within:ring-4 focus-within:ring-indigo-500/10 
        focus-within:border-indigo-500
      ">
        {/* Ikona - pozicionuojama viršuje, šalia pirmo teksto eilutės */}
        {icon && (
          <span className="mr-2.5 text-lg mt-1 opacity-70 grayscale">
            {icon}
          </span>
        )}
        
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || "Įrašykite pastabas..."}
          rows={3}
          className="
            bg-transparent 
            flex-1 
            outline-none 
            text-slate-900 
            placeholder:text-slate-400
            text-sm
            leading-relaxed
            resize-none
            w-full
          "
        />
      </div>
    </div>
  );
}