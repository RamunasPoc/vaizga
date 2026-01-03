'use client';

import { useState } from 'react';

/* =======================
   TIPAI
======================= */

export type ExtraWork = {
  date: string;
  description: string;
  hours: number | '';
};

export type HolidayWork = {
  date: string;
  km: number | '';
  loads: number | '';
  stations: number | '';
};

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

  loadHours: number;

  extraWorks: ExtraWork[];
  addExtraWork: () => void;
  updateExtraWork: (
    index: number,
    field: keyof ExtraWork,
    value: string | number | ''
  ) => void;
  removeExtraWork: (index: number) => void;

  holidayWorks: HolidayWork[];
  addHolidayWork: () => void;
  updateHolidayWork: (
    index: number,
    field: keyof HolidayWork,
    value: string | number | ''
  ) => void;
  removeHolidayWork: (index: number) => void;

  // Parašo būsena
  signature: string | null;
  setSignature: (v: string | null) => void;

  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  holidayPay: number;
  total: number;
}

/* =======================
   TARIFAI (VIENOJE VIETOJE)
======================= */

const RATES = {
  KM: 11.4 / 100,      // 0.114 €/km
  LOAD_HOURS: 2,       // 2 valandos už pakrovimą
  HOURLY: 7.6,         // Valandinis tarifas
  STATION_MIN: 20,     // 20 min už degalinę
};

/* =======================
   HOOK
======================= */

export function useSalaryCalculator(): SalaryCalculatorState {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [km, setKm] = useState<number | ''>('');
  const [loads, setLoads] = useState<number | ''>('');
  const [stations, setStations] = useState<number | ''>('');

  const [extraWorks, setExtraWorks] = useState<ExtraWork[]>([]);
  const [holidayWorks, setHolidayWorks] = useState<HolidayWork[]>([]);
  
  // Pridedame parašo būseną (saugomas kaip Base64 string)
  const [signature, setSignature] = useState<string | null>(null);

  /* =======================
     PAGRINDINIAI SKAIČIAVIMAI
  ======================= */

  const kmPay = km !== '' ? Number(km) * RATES.KM : 0;
  const loadHours = loads !== '' ? Number(loads) * RATES.LOAD_HOURS : 0;
  const loadPay = loadHours * RATES.HOURLY;

  const stationPay =
    stations !== ''
      ? (Number(stations) * RATES.STATION_MIN / 60) * RATES.HOURLY
      : 0;

  /* =======================
     PAPILDOMI DARBAI
  ======================= */

  const extraPay = extraWorks.reduce((sum, w) => {
    if (w.hours === '') return sum;
    return sum + Number(w.hours) * RATES.HOURLY;
  }, 0);

  const addExtraWork = () =>
    setExtraWorks((prev) => [...prev, { date: '', description: '', hours: '' }]);

  const updateExtraWork = (index: number, field: keyof ExtraWork, value: string | number | '') => {
    setExtraWorks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeExtraWork = (index: number) =>
    setExtraWorks((prev) => prev.filter((_, i) => i !== index));

  /* =======================
     ŠVENTINĖS DIENOS (x2)
  ======================= */

  const holidayPay = holidayWorks.reduce((sum, day) => {
    const dayKmPay = day.km !== '' ? Number(day.km) * RATES.KM : 0;
    const dayLoadPay = day.loads !== '' ? Number(day.loads) * RATES.LOAD_HOURS * RATES.HOURLY : 0;
    const dayStationPay = day.stations !== '' ? (Number(day.stations) * RATES.STATION_MIN / 60) * RATES.HOURLY : 0;

    const dayTotal = dayKmPay + dayLoadPay + dayStationPay;
    return sum + (dayTotal * 2); 
  }, 0);

  const addHolidayWork = () =>
    setHolidayWorks((prev) => [...prev, { date: '', km: '', loads: '', stations: '' }]);

  const updateHolidayWork = (index: number, field: keyof HolidayWork, value: string | number | '') => {
    setHolidayWorks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const removeHolidayWork = (index: number) =>
    setHolidayWorks((prev) => prev.filter((_, i) => i !== index));

  /* =======================
     GALUTINĖ ALGA
  ======================= */

  const total = kmPay + loadPay + stationPay + extraPay + holidayPay;

  return {
    name, surname, setName, setSurname,
    km, loads, stations, setKm, setLoads, setStations,
    loadHours,
    extraWorks, addExtraWork, updateExtraWork, removeExtraWork,
    holidayWorks, addHolidayWork, updateHolidayWork, removeHolidayWork,
    signature, setSignature, // Grąžiname parašo funkcijas
    kmPay, loadPay, stationPay, extraPay, holidayPay, total,
  };
}