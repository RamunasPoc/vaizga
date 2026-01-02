'use client';

type Props = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  icon?: string;
};

export default function TextInput({ label, value, setValue, icon }: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-300">{label}</label>
      <div className="flex items-center bg-gray-700 p-2 rounded-lg">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)} // tik value
          className="bg-gray-700 flex-1 outline-none text-white p-2 rounded-lg"
        />
      </div>
    </div>
  );
}
