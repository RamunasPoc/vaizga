'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
    <Section title="Šventinės dienos (+50 € priedas)">
      <div className="space-y-5">
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {holidayWorks.map((day, index) => (
              <motion.div
                key={`holiday-${index}`}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                layout
                className="bg-white border border-rose-100 p-5 rounded-2xl space-y-5 relative shadow-sm"
              >
                {/* Datos pasirinkimas - MODERNUS IR ŠVIESUS */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-semibold text-rose-600 ml-0.5 flex items-center gap-2">
                    <span className="text-lg">🗓️</span> Šventinė data
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">
                      📅
                    </span>
                    <input
                      type="date"
                      value={day.date}
                      onChange={(e) => updateHolidayWork(index, 'date', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 pl-11 rounded-xl text-slate-900 
                                 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-400 
                                 outline-none transition-all cursor-pointer font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Skaičių įvedimas naudojant modernizuotus komponentus */}
                <div className="space-y-4">
                  <NumberInput
                    label="Nuvažiuoti KM tą dieną"
                    value={day.km}
                    setValue={(v) => updateHolidayWork(index, 'km', v)}
                    icon="🛣️"
                  />
                  <div className="grid grid-cols-2 gap-4">
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
                  className="absolute -top-2 -right-2 bg-white hover:bg-rose-500 text-slate-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center border border-rose-100 transition-all shadow-md active:scale-90"
                  title="Pašalinti"
                >
                  ✕
                </button>

                {/* Bonus indikatorius kiekvienoje kortelėje */}
                <div className="bg-rose-50/50 rounded-lg py-1.5 px-3 border border-rose-100/50">
                   <p className="text-[11px] text-rose-600 font-bold text-center uppercase tracking-wider">
                     + 50.00 € Priedas aktyvuotas
                   </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pridėjimo mygtukas */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={addHolidayWork}
          className="w-full border-2 border-dashed border-rose-200 hover:border-rose-400 bg-rose-50/30 hover:bg-rose-50 text-rose-600 p-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:bg-rose-100"
        >
          <span className="text-xl">➕</span> Pridėti šventinę dieną
        </motion.button>
        
        <div className="bg-slate-100/50 rounded-xl p-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center font-bold">
            Prie įprasto dienos uždarbio sistema pridės fiksuotą 50 € priedą
          </p>
        </div>
      </div>
    </Section>
  );
}