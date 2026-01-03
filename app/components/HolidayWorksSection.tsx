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
    <Section title="Šventinės dienos (mokama x2)">
      {holidayWorks.map((day, index) => (
        <div
          key={index}
          className="bg-red-900/30 p-4 rounded-xl space-y-3 relative"
        >
          <input
            type="date"
            value={day.date}
            onChange={(e) =>
              updateHolidayWork(index, 'date', e.target.value)
            }
            className="w-full bg-gray-700 p-3 rounded-lg"
          />

          <NumberInput
            label="Kilometrai"
            value={day.km}
            setValue={(v) => updateHolidayWork(index, 'km', v)}
          />

          <NumberInput
            label="Pakrovimai"
            value={day.loads}
            setValue={(v) => updateHolidayWork(index, 'loads', v)}
          />

          <NumberInput
            label="Degalinės"
            value={day.stations}
            setValue={(v) => updateHolidayWork(index, 'stations', v)}
          />

          <button
            onClick={() => removeHolidayWork(index)}
            className="absolute top-2 right-2 text-red-400"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addHolidayWork}
        className="w-full border-2 border-dashed border-red-500 text-red-400 p-4 rounded-xl font-bold"
      >
        ➕ Pridėti šventinę dieną
      </button>
    </Section>
  );
}
