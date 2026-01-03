'use client';

import Section from './Section';
import NumberInput from './inputs/NumberInput';
import { HolidayWork } from '../hooks/useSalaryCalculator';

type Props = {
  holidayWorks: HolidayWork[];
  addHolidayWork: () => void;
  updateHolidayWork: (
    index: number,
    field: keyof HolidayWork,
    value: string | number | ''
  ) => void;
  removeHolidayWork: (index: number) => void;
};

export default function HolidayWorksSection({
  holidayWorks,
  addHolidayWork,
  updateHolidayWork,
  removeHolidayWork,
}: Props) {
  return (
    <Section title="Šventinės dienos (x2)">
      <div className="space-y-4">
        {holidayWorks.map((day, index) => (
          <div
            key={index}
            className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl space-y-3 relative"
          >
            {/* Datos pasirinkimas su ikona */}
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-sm">📅</span>
              <input
                type="date"
                value={day.date}
                onChange={(e) =>
                  updateHolidayWork(index, 'date', e.target.value)
                }
                className="w-full bg-gray-800 p-3 pl-10 rounded-lg text-white border border-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <NumberInput
                label="Kilometrai"
                value={day.km}
                setValue={(v) => updateHolidayWork(index, 'km', v)}
                icon="🛣️"
              />
              <NumberInput
                label="Pakrovimai"
                value={day.loads}
                setValue={(v) => updateHolidayWork(index, 'loads', v)}
                icon="📦"
              />
              <NumberInput
                label="Degalinės"
                value={day.stations}
                setValue={(v) => updateHolidayWork(index, 'stations', v)}
                icon="⛽"
              />
            </div>

            <button
              onClick={() => removeHolidayWork(index)}
              className="absolute -top-1 -right-1 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
              title="Pašalinti"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addHolidayWork}
          className="w-full border-2 border-dashed border-red-500/50 hover:border-red-500 text-red-400 p-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span>➕</span> Pridėti šventinę dieną
        </button>
        
        <p className="text-[10px] text-gray-500 uppercase tracking-wider text-center">
          Dvigubas tarifas taikomas automatiškai
        </p>
      </div>
    </Section>
  );
}