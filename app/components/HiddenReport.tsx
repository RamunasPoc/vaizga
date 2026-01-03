'use client';

import { SalaryCalculatorState } from '../hooks/useSalaryCalculator';

export default function HiddenReport({
  name,
  surname,
  km,
  loads,
  stations,
  extraWorks,
  holidayWorks,
  loadHours,
  total,
  kmPay,
  loadPay,
  stationPay,
  extraPay,
  holidayPay,
}: SalaryCalculatorState) {
  return (
    <div
      id="report"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 0,
        width: '210mm',
        background: '#ffffff',
        color: '#000000',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
      }}
    >
      <h1 style={{ fontSize: 18, marginBottom: 16 }}>
        Vairuotojo darbo ataskaita
      </h1>

      <p><b>Vardas:</b> {name}</p>
      <p><b>Pavardė:</b> {surname}</p>
      <p><b>Nuvažiuoti km:</b> {km}</p>
      <p><b>Pakrovimai terminale:</b> {loads} ({loadHours} val.)</p>
      <p><b>Degalinės:</b> {stations}</p>

      {/* Papildomi darbai */}
      {extraWorks.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <b>Papildomi darbai:</b>
          <ul style={{ marginLeft: 20 }}>
            {extraWorks.map((w, i) => (
              <li key={i}>
                {w.date ? `${w.date}: ` : ''}
                {w.description}
                {w.hours !== '' ? ` (${w.hours} val.)` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Šventinės dienos */}
      {holidayWorks.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <b>Šventinės dienos (mokama dvigubai):</b>
          <ul style={{ marginLeft: 20 }}>
            {holidayWorks.map((d, i) => (
              <li key={i}>
                📅 {d.date} — {d.km} km, {d.loads} pakrov., {d.stations} deg.
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr style={{ margin: '16px 0' }} />

      <h2 style={{ fontSize: 14, marginBottom: 8 }}>Algos sudėtis</h2>

      <p>KM: {kmPay.toFixed(2)} €</p>
      <p>Terminalai: {loadPay.toFixed(2)} €</p>
      <p>Degalinės: {stationPay.toFixed(2)} €</p>
      <p>Papildomi darbai: {extraPay.toFixed(2)} €</p>

      {holidayPay > 0 && (
        <p>Šventinės dienos: {holidayPay.toFixed(2)} €</p>
      )}

      <hr style={{ margin: '12px 0' }} />

      <p style={{ fontSize: 14, fontWeight: 'bold' }}>
        Bendra alga: {total.toFixed(2)} €
      </p>
    </div>
  );
}
