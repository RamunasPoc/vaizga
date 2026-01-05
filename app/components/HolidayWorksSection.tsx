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
            key={`holiday-${index}`}
            className="bg-red-950/20 border border-red-900/40 p-4 rounded-2xl space-y-4 relative shadow-inner"
          >
            {/* Datos pasirinkimas - PATOBULINTAS MATOMUMAS */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-red-300/70 ml-1 font-medium">Šventinė data</label>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">
                  📅
                </span>
                <input
                  type="date"
                  value={day.date}
                  onChange={(e) => updateHolidayWork(index, 'date', e.target.value)}
                  style={{ colorScheme: 'dark' }} // Tamsus kalendoriaus langas
                  className="w-full bg-gray-700 border border-gray-600 p-3 pl-11 rounded-xl text-white 
                             focus:ring-2 focus:ring-red-500 focus:border-transparent 
                             outline-none transition-all cursor-pointer
                             /* Ryškus kalendoriaus indikatorius */
                             [&::-webkit-calendar-picker-indicator]:filter 
                             [&::-webkit-calendar-picker-indicator]:invert 
                             [&::-webkit-calendar-picker-indicator]:opacity-70
                             hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                />
              </div>
            </div>

            {/* Skaičių įvedimas */}
            <div className="grid grid-cols-1 gap-4">
              <NumberInput
                label="Nuvažiuoti KM tą dieną"
                value={day.km}
                setValue={(v) => updateHolidayWork(index, 'km', v)}
                icon="🛣️"
              />
              <div className="grid grid-cols-2 gap-3">
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
            </div>

            {/* Pašalinimo mygtukas */}
            <button
              onClick={() => removeHolidayWork(index)}
              className="absolute -top-2 -right-2 bg-gray-800 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center border border-red-900/50 transition-all shadow-xl active:scale-90"
              title="Pašalinti"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addHolidayWork}
          className="w-full border-2 border-dashed border-red-500/30 hover:border-red-500 bg-red-500/5 text-red-400 p-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:bg-red-500/10"
        >
          <span>➕</span> Pridėti šventinę dieną
        </button>
        
        <p className="text-[10px] text-red-500/60 uppercase tracking-widest text-center font-medium">
          Sistema automatiškai pritaikys dvigubą tarifą
        </p>
      </div>
    </Section>
  );
}