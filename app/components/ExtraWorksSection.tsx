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
    <Section title="Papildomi darbai / Ilgesni  nei 1 val pakrovimai ir iškrovimai">
      <div className="space-y-4">
        <p className="text-[11px] text-gray-500 italic px-1">
          Nurodykite atliktus darbus, datą, aprašymą ir laiką.
        </p>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {extraWorks.map((work, index) => (
              <motion.div
                // Naudojame unikalų raktą derinyje su index, jei nėra id
                key={`work-${index}`} 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                layout
                className="bg-gray-800/40 border border-gray-700 p-4 rounded-2xl space-y-4 relative shadow-inner"
              >
                {/* Datos pasirinkimas */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm text-gray-400 ml-1">Data</label>
                  <div className="relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none z-10">
                      📅
                    </span>
                    <input
                      type="date"
                      value={work.date}
                      onChange={(e) => updateExtraWork(index, 'date', e.target.value)}
                      style={{ colorScheme: 'dark' }}
                      className="w-full bg-gray-700 border border-gray-600 p-3 pl-11 rounded-xl text-white 
                                 focus:ring-2 focus:ring-green-500 focus:border-transparent 
                                 outline-none transition-all cursor-pointer
                                 [&::-webkit-calendar-picker-indicator]:filter 
                                 [&::-webkit-calendar-picker-indicator]:invert 
                                 [&::-webkit-calendar-picker-indicator]:opacity-70"
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
                  label="Sugaištas laikas"
                  value={work.hours}
                  setValue={(val) => updateExtraWork(index, 'hours', val)}
                  icon="⏱️"
                />

                {/* Pašalinimo mygtukas */}
                <button
                  onClick={() => removeExtraWork(index)}
                  className="absolute -top-2 -right-2 bg-gray-700 hover:bg-red-500 text-white w-9 h-9 rounded-full flex items-center justify-center border border-gray-600 transition-all shadow-xl active:scale-90"
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
          onClick={addExtraWork}
          className="w-full border-2 border-dashed border-green-500/30 hover:border-green-500 bg-green-500/5 text-green-400 p-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-green-500/10 active:bg-green-500/20"
        >
          <span className="text-xl">➕</span> Pridėti papildomą darbą
        </motion.button>
      </div>
    </Section>
  );
}