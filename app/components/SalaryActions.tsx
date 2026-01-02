'use client';

type Props = {
  onGeneratePDF: () => void;
};

export default function SalaryActions({ onGeneratePDF }: Props) {
  return (
    <button
      onClick={onGeneratePDF}
      className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-lg font-bold"
    >
      📄 Generuoti PDF
    </button>
  );
}
