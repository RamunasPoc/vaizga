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

  // Naktinės pamainos ir nakvynės
  nightShifts: number | '';
  setNightShifts: (v: number | '') => void;
  sleepOvers: number | '';
  setSleepOvers: (v: number | '') => void;

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

  signature: string | null;
  setSignature: (v: string | null) => void;

  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
  holidayPay: number;
  nightPay: number; 
  sleepPay: number;
  total: number;
}

/* =======================
   TARIFAI
======================= */

const RATES = {
  KM: 11.4 / 100,      
  LOAD_HOURS: 2,       
  HOURLY: 7.6,         
  STATION_MIN: 20,     
  NIGHT_SHIFT: 20,     // 20 € už naktinę pamainą
  SLEEP_OVER: 20,      // 20 € už nakvynę vilkike
  HOLIDAY_BONUS: 50,   // NAUJA: 50 € priedas už šventinę dieną
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
  
  const [nightShifts, setNightShifts] = useState<number | ''>('');
  const [sleepOvers, setSleepOvers] = useState<number | ''>('');

  const [extraWorks, setExtraWorks] = useState<ExtraWork[]>([]);
  const [holidayWorks, setHolidayWorks] = useState<HolidayWork[]>([]);
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

  const nightPay = nightShifts !== '' ? Number(nightShifts) * RATES.NIGHT_SHIFT : 0;
  const sleepPay = sleepOvers !== '' ? Number(sleepOvers) * RATES.SLEEP_OVER : 0;

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
     ŠVENTINĖS DIENOS (+50 € priedas)
  ======================= */

  const holidayPay = holidayWorks.reduce((sum, day) => {
    const dayKmPay = day.km !== '' ? Number(day.km) * RATES.KM : 0;
    const dayLoadPay = day.loads !== '' ? Number(day.loads) * RATES.LOAD_HOURS * RATES.HOURLY : 0;
    const dayStationPay = day.stations !== '' ? (Number(day.stations) * RATES.STATION_MIN / 60) * RATES.HOURLY : 0;

    const dayTotal = dayKmPay + dayLoadPay + dayStationPay;

    // Jeigu bent vienas laukelis užpildytas, pridedame 50 € bonusą.
    const hasWork = day.km !== '' || day.loads !== '' || day.stations !== '';
    const dayBonus = hasWork ? RATES.HOLIDAY_BONUS : 0;

    return sum + dayTotal + dayBonus; 
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

  const total = kmPay + loadPay + stationPay + extraPay + holidayPay + nightPay + sleepPay;

  return {
    name, surname, setName, setSurname,
    km, loads, stations, setKm, setLoads, setStations,
    nightShifts, setNightShifts, 
    sleepOvers, setSleepOvers,
    loadHours,
    extraWorks, addExtraWork, updateExtraWork, removeExtraWork,
    holidayWorks, addHolidayWork, updateHolidayWork, removeHolidayWork,
    signature, setSignature,
    kmPay, loadPay, stationPay, extraPay, holidayPay, nightPay, sleepPay, total,
  };
}