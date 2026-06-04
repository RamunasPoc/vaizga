'use client';

import { useState, useEffect } from 'react';
import { SalaryCalculatorState } from '../hooks/useSalaryCalculator';

export default function HiddenReport({
  name,
  surname,
  km,
  loads,
  stations,
  nightShifts,
  sleepOvers,
  extraWorks,
  holidayWorks,
  loadHours,
  total,
  kmPay,
  loadPay,
  stationPay,
  extraPay,
  holidayPay,
  nightPay,
  sleepPay,
  signature,
}: SalaryCalculatorState) {
  
  // Saugiklis nuo Hydration Error (Server vs Client laiko nesutapimo)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const kmToHours = (kmValue: number | string) => Number(kmValue || 0) * 0.015;
  const stationToHours = (count: number | string) => (Number(count || 0) * 20) / 60;
  const loadToHours = (count: number | string) => Number(count || 0) * 2;

  // Pagalbinės spalvos (atitinka modernų Indigo stilių)
  const colors = {
    primary: '#4f46e5', // Indigo 600
    text: '#1e293b',    // Slate 800
    lightText: '#64748b', // Slate 500
    border: '#e2e8f0',  // Slate 200
    bg: '#f8fafc',      // Slate 50
    accent: '#f59e0b',  // Amber (priedams išskirti)
  };

  // Jei kodas vykdomas serveryje, laikinai nieko nerodome, kad išvengtume klaidų
  if (!isMounted) return null;

  // Datos ir laiko fiksavimas vyksta tik naršyklėje
  const formattedDate = new Date().toLocaleDateString('lt-LT');
  const formattedTime = new Date().toLocaleTimeString('lt-LT');

  return (
    <div
      id="report"
      style={{
        position: 'fixed',
        left: '-9999px',
        top: '0',
        width: '210mm',
        minHeight: '297mm',
        background: '#ffffff',
        color: colors.text,
        padding: '20mm',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '11px',
        lineHeight: '1.5',
        zIndex: -1000,
      }}
    >
      {/* 1. HEADER - Modernus ir švarus */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', borderBottom: `4px solid ${colors.primary}`, paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: colors.primary, margin: 0, letterSpacing: '-0.02em' }}>DARBO ATASKAITA</h1>
          <p style={{ color: colors.lightText, margin: '4px 0 0 0', fontSize: '10px' }}>
            Sugeneruota: {formattedDate} {formattedTime}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', textTransform: 'uppercase' }}>{name || '—'} {surname || ''}</p>
          <p style={{ margin: '2px 0 0 0', color: colors.primary, fontWeight: '600', fontSize: '10px', letterSpacing: '0.05em' }}>VAIRUOTOJO SUVESTINĖ</p>
        </div>
      </div>

      {/* 2. PAGRINDINĖ VEIKLA */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '10px', color: colors.primary, textTransform: 'uppercase' }}>1. Mėnesio veiklos suvestinė</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.text}`, textAlign: 'left', fontSize: '10px' }}>
              <th style={{ padding: '8px 0' }}>Veikla</th>
              <th style={{ padding: '8px 0', textAlign: 'center' }}>Kiekis</th>
              <th style={{ padding: '8px 0', textAlign: 'right' }}>Laikas (Val.)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={{ padding: '10px 0' }}>Vairavimas (pagal nuvažiuotus km)</td>
              <td style={{ textAlign: 'center' }}>{km || 0} km</td>
              <td style={{ textAlign: 'right', fontWeight: '600' }}>{kmToHours(km || 0).toFixed(2)} h</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={{ padding: '10px 0' }}>Pakrovimai / iškrovimai terminale</td>
              <td style={{ textAlign: 'center' }}>{loads || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: '600' }}>{loadHours.toFixed(2)} h</td>
            </tr>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              <td style={{ padding: '10px 0' }}>Stovėjimas degalinėse</td>
              <td style={{ textAlign: 'center' }}>{stations || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: '600' }}>{stationToHours(stations || 0).toFixed(2)} h</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. ŠVENTINĖS DIENOS */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '10px', color: '#b91c1c', textTransform: 'uppercase' }}>2. Šventinės dienos (+50.00 € priedas už dieną)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${colors.border}` }}>
            <thead style={{ backgroundColor: colors.bg }}>
              <tr style={{ textAlign: 'left', fontSize: '9px', color: '#b91c1c', borderBottom: '1px solid #fee2e2' }}>
                <th style={{ padding: '8px' }}>Data</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Nuvažiuota</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Pakrovimai</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Degalinės</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Dienos priedas</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => (
                <tr key={`holiday-${i}`} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '8px', fontWeight: '700' }}>{d.date || '—'}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{d.km || 0} km</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{d.loads || 0} vnt.</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>{d.stations || 0} vnt.</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: '700', color: '#b91c1c' }}>+ 50.00 €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. PAPILDOMI DARBAI */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '10px', color: colors.primary, textTransform: 'uppercase' }}>3. Papildomi darbai</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ borderBottom: `1px solid ${colors.text}` }}>
              <tr style={{ fontSize: '9px', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Data</th>
                <th style={{ padding: '8px' }}>Aprašymas</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Laikas</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={`extra-${i}`} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td style={{ padding: '8px' }}>{w.date}</td>
                  <td style={{ padding: '8px' }}>{w.description}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: '600' }}>{Number(w.hours || 0).toFixed(2)} h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. FINANSINĖ SUVESTINĖ */}
      <div style={{ marginTop: '30px', border: `2px solid ${colors.text}`, padding: '20px', backgroundColor: colors.bg, borderRadius: '8px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '15px', textTransform: 'uppercase', borderBottom: `1px solid ${colors.text}`, paddingBottom: '8px' }}>Atlygio suvestinė</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Bazinis uždarbis (km + laikas):</span>
          <span style={{ fontWeight: '600' }}>{(kmPay + loadPay + stationPay + extraPay).toFixed(2)} €</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Priedai už naktis ir nakvynes:</span>
          <span style={{ fontWeight: '600' }}>{(nightPay + sleepPay).toFixed(2)} €</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#b91c1c' }}>
          <span style={{ fontWeight: '600' }}>Šventinių dienų priedai (vnt. x 50€):</span>
          <span style={{ fontWeight: '700' }}>{holidayPay.toFixed(2)} €</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: `2px solid ${colors.text}`, fontSize: '20px', fontWeight: '800', color: colors.primary }}>
          <span>GALUTINĖ SUMA:</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* 6. PARAŠAS */}
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '10px', marginBottom: '8px', color: colors.lightText, fontWeight: '600' }}>Vairuotojo parašas:</p>
          {/* ŠTAI ČIA BUVO LIKĘS justify: 'center' */}
          <div style={{ width: '220px', height: '80px', border: `1px solid ${colors.border}`, backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {signature ? (
              <img src={signature} alt="Parašas" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
            ) : (
              <span style={{ color: colors.border, fontSize: '10px' }}>PASIRAŠYTA ELEKTRONINIU BŪDU</span>
            )}
          </div>
          <p style={{ fontWeight: '700', marginTop: '8px', fontSize: '13px' }}>{name} {surname}</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: '15mm', left: '20mm', right: '20mm', textAlign: 'center', fontSize: '9px', color: colors.lightText, borderTop: `1px solid ${colors.border}`, paddingTop: '10px' }}>
        Dokumentas sugeneruotas automatiškai. Patvirtinu, kad visi pateikti duomenys apie ridą ir darbo laiką yra teisingi.
      </div>
    </div>
  );
}