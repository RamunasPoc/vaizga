'use client';

import { useState, SetStateAction } from 'react';

export type ExtraWork = {
  date: string;
  description: string;
  hours: number | '';
};

/**
 * VISAS calculator state tipas
 */
export interface SalaryCalculatorState {
  name: string;
  surname: string;
  setName: (v: string) => void;
  setSurname: (v: string) => void;

  km: number | '';
  loads: number | '';
  stations: number | '';
  setKm: (v: number | '') => void;
  setLoads: (v: number | '') => void;
  setStations: (v: number | '') => void;

  extraWorks: ExtraWork[];
  addExtraWork: () => void;
  updateExtraWork: (
    index: number,
    field: keyof ExtraWork,
    value: SetStateAction<string | number | ''>
  ) => void;
  removeExtraWork: (index: number) => void;

  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  loadHours: number;
  total: number;
}

export function useSalaryCalculator(): SalaryCalculatorState {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>('');
  const [stations, setStations] = useState<number | ''>('');

  const [extraWorks, setExtraWorks] = useState<ExtraWork[]>([]);

  // 🔢 Skaičiavimai
  const kmPay = km !== '' ? (Number(km) / 100) * 11.4 : 0;

  const loadHours = loads !== '' ? Number(loads) * 2 : 0;
  const loadPay = loadHours * 7.6;

  const stationPay =
    stations !== '' ? (Number(stations) * 20 / 60) * 7.6 : 0;

  const extraPay = extraWorks.reduce((sum, w) => {
    if (w.hours === '') return sum;
    return sum + Number(w.hours) * 7.6;
  }, 0);

  const total = kmPay + loadPay + stationPay + extraPay;

  // ➕ Papildomi darbai
  const addExtraWork = () =>
    setExtraWorks((prev) => [
      ...prev,
      { date: '', description: '', hours: '' },
    ]);

  const updateExtraWork = (
    index: number,
    field: keyof ExtraWork,
    value: SetStateAction<string | number | ''>
  ) => {
    setExtraWorks((prev) => {
      const updated = [...prev];
      const current = updated[index][field];

      updated[index] = {
        ...updated[index],
        [field]:
          typeof value === 'function'
            ? value(current as any)
            : value,
      };

      return updated;
    });
  };

  const removeExtraWork = (index: number) =>
    setExtraWorks((prev) => prev.filter((_, i) => i !== index));

  return {
    name,
    surname,
    setName,
    setSurname,

    km,
    loads,
    stations,
    setKm,
    setLoads,
    setStations,

    extraWorks,
    addExtraWork,
    updateExtraWork,
    removeExtraWork,

    kmPay,
    loadPay,
    stationPay,
    extraPay,
    loadHours,
    total,
  };
}
