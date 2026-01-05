'use client';

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
  // Pagalbinės funkcijos laiko konvertavimui (skaidrumui užtikrinti)
  const kmToHours = (kmValue: number | string) => Number(kmValue || 0) * 0.015;
  const stationToHours = (count: number | string) => (Number(count || 0) * 20) / 60;
  const loadToHours = (count: number | string) => Number(count || 0) * 2;

  return (
    <div
      id="report"
      style={{
        position: 'fixed',
        left: '-9999px', // Saugus paslėpimas PDF generavimui
        top: '0',
        width: '210mm',
        minHeight: '297mm',
        background: '#ffffff',
        color: '#000000',
        padding: '20mm',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '10px',
        lineHeight: '1.4',
        zIndex: -1000,
      }}
    >
      {/* 1. ANTRAŠTĖ */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Darbo Ataskaita</h1>
          <p style={{ color: '#666', margin: 0, fontSize: '9px' }}>Sugeneruota per Vaizga App • {new Date().toLocaleDateString('lt-LT')} {new Date().toLocaleTimeString('lt-LT')}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>{name || '—'} {surname || ''}</p>
          <p style={{ margin: 0, color: '#666', fontSize: '9px' }}>VAIRUOTOJO SUVESTINĖ</p>
        </div>
      </div>

      {/* 2. MĖNESIO SUVESTINĖ SU LAIKAIS */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '11px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>1. Mėnesio veikla ir laiko sąnaudos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000', textAlign: 'left', fontSize: '9px' }}>
              <th style={{ padding: '6px 0' }}>Veikla</th>
              <th style={{ padding: '6px 0', textAlign: 'center' }}>Kiekis / Atstumas</th>
              <th style={{ padding: '6px 0', textAlign: 'right' }}>Laikas (Val.)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Vairavimas (0.015 val./km):</td>
              <td style={{ textAlign: 'center' }}>{km || 0} km</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{kmToHours(km || 0).toFixed(2)} val.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Pakrovimai terminale (2.0 val./vnt.):</td>
              <td style={{ textAlign: 'center' }}>{loads || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{loadHours.toFixed(2)} val.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Degalinės (20 min./vnt.):</td>
              <td style={{ textAlign: 'center' }}>{stations || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stationToHours(stations || 0).toFixed(2)} val.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. ŠVENTINĖS DIENOS (DETALU: KIEKIS IR LAIKAS) */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '11px', backgroundColor: '#fff0f0', color: '#b91c1c', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>2. Šventinių dienų detalizacija (x2 tarifas)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #fee2e2' }}>
            <thead>
              <tr style={{ backgroundColor: '#fef2f2', borderBottom: '1px solid #b91c1c', textAlign: 'left', fontSize: '8px', color: '#b91c1c' }}>
                <th style={{ padding: '6px 4px' }}>Data</th>
                <th style={{ padding: '6px 4px', textAlign: 'center' }}>KM (Laikas)</th>
                <th style={{ padding: '6px 4px', textAlign: 'center' }}>Pakr. (Laikas)</th>
                <th style={{ padding: '6px 4px', textAlign: 'center' }}>Deg. (Laikas)</th>
                <th style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold' }}>Suma (x2 val.)</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => {
                const hKmH = kmToHours(d.km || 0);
                const hLoadH = loadToHours(d.loads || 0);
                const hStatH = stationToHours(d.stations || 0);
                const hDayTotal = (hKmH + hLoadH + hStatH) * 2;

                return (
                  <tr key={`holiday-row-${i}`} style={{ borderBottom: '1px solid #fee2e2' }}>
                    <td style={{ padding: '6px 4px', fontWeight: 'bold' }}>{d.date}</td>
                    <td style={{ padding: '6px 4px', textAlign: 'center' }}>
                      {d.km} km <br/> <span style={{fontSize: '8px', color: '#666'}}>({hKmH.toFixed(2)} h)</span>
                    </td>
                    <td style={{ padding: '6px 4px', textAlign: 'center' }}>
                      {d.loads} vnt. <br/> <span style={{fontSize: '8px', color: '#666'}}>({hLoadH.toFixed(2)} h)</span>
                    </td>
                    <td style={{ padding: '6px 4px', textAlign: 'center' }}>
                      {d.stations} vnt. <br/> <span style={{fontSize: '8px', color: '#666'}}>({hStatH.toFixed(2)} h)</span>
                    </td>
                    <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold', color: '#b91c1c' }}>
                      {hDayTotal.toFixed(2)} val.
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. PAPILDOMI DARBAI */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '11px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>3. Papildomi darbai / prastovos</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000', fontSize: '9px' }}>
                <th style={{ padding: '4px', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '4px', textAlign: 'left' }}>Aprašymas</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Laikas (val.)</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={`extra-row-${i}`} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '6px 4px' }}>{w.date}</td>
                  <td style={{ padding: '6px 4px' }}>{w.description}</td>
                  <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold' }}>{Number(w.hours || 0).toFixed(2)} val.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. FINANSINĖ SUVESTINĖ (Panaudoti visi kintamieji) */}
      <div style={{ marginTop: '20px', border: '1.5px solid #000', padding: '15px', backgroundColor: '#fafafa' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '5px' }}>4. Galutinis atlygio paskaičiavimas</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Už nuvažiuotus kilometrus ({km || 0} km):</span>
          <span>{kmPay.toFixed(2)} €</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Už sugaištą laiką (Pakr./Deg./Papildomi):</span>
          <span>{(loadPay + stationPay + extraPay).toFixed(2)} €</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Priedai: Naktys ({nightShifts || 0}), Nakvynės ({sleepOvers || 0}):</span>
          <span>{(nightPay + sleepPay).toFixed(2)} €</span>
        </div>

        {holidayPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#b91c1c', fontWeight: 'bold' }}>
            <span>Papildomas priedas už šventines dienas:</span>
            <span>{holidayPay.toFixed(2)} €</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #000', fontSize: '16px', fontWeight: 'bold' }}>
          <span>IŠMOKĖTI Į RANKAS (EUR):</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* 6. PARAŠAS */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '9px', marginBottom: '5px', color: '#666' }}>Patvirtinta vairuotojo parašu:</p>
          <div style={{ width: '180px', height: '70px', border: '1px solid #ccc', backgroundColor: '#fff', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {signature ? (
              <img src={signature} alt="Parašas" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <span style={{ color: '#eee', fontSize: '8px' }}>PARAŠO VIETA</span>
            )}
          </div>
          <p style={{ fontWeight: 'bold', margin: 0, fontSize: '12px', textTransform: 'uppercase' }}>{name} {surname}</p>
          <p style={{ fontSize: '8px', color: '#999' }}>Dokumento ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
        </div>
      </div>

      {/* Dokumento apačia */}
      <div style={{ position: 'absolute', bottom: '15mm', left: '20mm', right: '20mm', textAlign: 'center', fontSize: '8px', color: '#aaa', borderTop: '1px solid #eee', paddingTop: '5px' }}>
        Ši ataskaita yra vidinis įmonės dokumentas darbo užmokesčiui pagrįsti. 
        Vairuotojas, pasirašydamas šį dokumentą, patvirtina duomenų teisingumą.
      </div>
    </div>
  );
}