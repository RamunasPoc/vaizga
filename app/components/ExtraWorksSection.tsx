'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import TextareaInput from './inputs/TextareaInput';
import NumberInput from './inputs/NumberInput';
import { ExtraWork } from '../hooks/useSalaryCalculator';

type Props = {
  extraWorks: ExtraWork[];
  addExtraWork: () => void;
  updateExtraWork: (
    index: number,
    field: keyof ExtraWork,
    value: string | number | ''
  ) => void;
  removeExtraWork: (index: number) => void;
};

export default function ExtraWorksSection({
  extraWorks,
  addExtraWork,
  updateExtraWork,
  removeExtraWork,
}: Props) {
  return (
    <Section title="Papildomi darbai / Ilgesni pakrovimai">
      <div className="space-y-5">
        <p className="text-xs text-slate-500 italic px-1 flex items-center gap-2">
          <span className="text-indigo-500">ℹ</span>
          Nurodykite atliktus darbus, datą, aprašymą ir laiką.
        </p>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {extraWorks.map((work, index) => (
              <motion.div
                key={`work-${index}`} 
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                layout
                className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4 relative shadow-sm"
              >
                {/* Datos pasirinkimas */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 ml-0.5">Data</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">
                      📅
                    </span>
                    <input
                      type="date"
                      value={work.date}
                      onChange={(e) => updateExtraWork(index, 'date', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 pl-11 rounded-xl text-slate-900 
                                 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 
                                 outline-none transition-all cursor-pointer font-medium text-sm"
                    />
                  </div>
                </div>

                <TextareaInput
                  label="Darbo aprašymas"
                  value={work.description}
                  setValue={(val) => updateExtraWork(index, 'description', val)}
                  icon="📝"
                />

                <NumberInput
                  label="Sugaištas laikas (valandomis)"
                  value={work.hours}
                  setValue={(val) => updateExtraWork(index, 'hours', val)}
                  icon="⏱️"
                />

                {/* Pašalinimo mygtukas */}
                <button
                  onClick={() => removeExtraWork(index)}
                  className="absolute -top-2 -right-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 transition-all shadow-md active:scale-90"
                  title="Pašalinti"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pridėjimo mygtukas */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={addExtraWork}
          className="w-full border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:bg-indigo-100"
        >
          <span className="text-xl text-indigo-500">➕</span> 
          Pridėti papildomą darbą
        </motion.button>
      </div>
    </Section>
  );
}