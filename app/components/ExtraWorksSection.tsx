'use client';

import { motion, AnimatePresence } from 'framer-motion'; // Reikės: yarn add framer-motion
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
    <Section title="Papildomi darbai / Ilgesni nei 1 val pakrovimai/iškrovimai">
      <div className="space-y-4">
        <p className="text-xs text-gray-400 italic px-1">
          Nurodykite atliktus darbus, datą, aprašymą ir kiek laiko užtrukta.
        </p>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {extraWorks.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                layout
                className="bg-gray-800/50 border border-gray-700 p-4 rounded-2xl space-y-3 relative shadow-inner"
              >
                {/* Datos pasirinkimas su ikona */}
                <div className="relative">
                   <span className="absolute left-3 top-3.5 text-sm">📅</span>
                   <input
                    type="date"
                    value={work.date}
                    onChange={(e) => updateExtraWork(index, 'date', e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 p-3 pl-10 rounded-xl text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
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

                {/* Pašalinimo mygtukas - didesnis, kad būtų lengviau pataikyti pirštu */}
                <button
                  onClick={() => removeExtraWork(index)}
                  className="absolute -top-2 -right-2 bg-gray-700 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-600 transition-colors shadow-lg"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Interaktyvus pridėjimo mygtukas */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={addExtraWork}
          className="w-full border-2 border-dashed border-green-500/40 hover:border-green-500 bg-green-500/5 text-green-400 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-green-500/10"
        >
          <span className="text-xl">➕</span> Pridėti papildomą darbą
        </motion.button>
      </div>
    </Section>
  );
}