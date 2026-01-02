'use client';

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
    <Section title="Kiti papildomi darbai arba labai ilgi pakrovimai (iškrovimai) (virš 1 val.) prašome nurodyti data ir aprašymą">
      {extraWorks.map((work, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-xl space-y-3 relative"
        >
          <input
            type="date"
            value={work.date}
            onChange={(e) =>
              updateExtraWork(index, 'date', e.target.value) // perduodame tik value
            }
            className="w-full bg-gray-700 p-3 rounded-lg"
          />

          <TextareaInput
            label="Darbo aprašymas"
            value={work.description}
            setValue={(val) =>
              updateExtraWork(index, 'description', val) // tik value
            }
            icon="📝"
          />

          <NumberInput
            label="Sugaištos valandos"
            value={work.hours}
            setValue={(val) =>
              updateExtraWork(index, 'hours', val) // tik value
            }
            icon="⏱️"
          />

          <button
            onClick={() => removeExtraWork(index)}
            className="absolute top-2 right-2 text-red-400"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addExtraWork}
        className="w-full border-2 border-dashed border-green-500 text-green-400 p-4 rounded-xl font-bold"
      >
        ➕ Pridėti papildomą darbą
      </button>
    </Section>
  );
}
