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
  // Pagalbinė funkcija degalinių laikui skaičiuoti
  const getStationHours = (count: number | string) => (Number(count || 0) * 20) / 60;

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
        color: '#000000',
        padding: '20mm',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
        zIndex: -1000,
      }}
    >
      {/* 1. ANTRAŠTĖ */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Darbo Ataskaita</h1>
          <p style={{ color: '#666', margin: 0, fontSize: '10px' }}>Vaizga App • {new Date().toLocaleDateString('lt-LT')} {new Date().toLocaleTimeString('lt-LT')}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{name || '—'} {surname || ''}</p>
          <p style={{ margin: 0, color: '#666' }}>Vairuotojo suvestinė</p>
        </div>
      </div>

      {/* 2. PAGRINDINĖ LENTELĖ */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '12px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>1. Mėnesio veiklos suvestinė</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Bendri nuvažiuoti kilometrai:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{km || 0} km</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Pakrovimai / Iškrovimai (terminale):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{loads || 0} vnt. ({loadHours || 0} val.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Degalinės (20 min./vnt.):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stations || 0} vnt. ({getStationHours(stations || 0).toFixed(2)} val.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Naktinės pamainos:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{nightShifts || 0} nakt.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Nakvynės vilkike:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{sleepOvers || 0} nakt.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. PAPILDOMI DARBAI */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>2. Papildomi darbai</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000', textAlign: 'left', fontSize: '10px' }}>
                <th style={{ padding: '4px' }}>Data</th>
                <th style={{ padding: '4px' }}>Aprašymas</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Laikas (val.)</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee', fontSize: '11px' }}>
                  <td style={{ padding: '6px 4px' }}>{w.date}</td>
                  <td style={{ padding: '6px 4px' }}>{w.description}</td>
                  <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold' }}>{w.hours} val.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. ŠVENTINĖS DIENOS */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '12px', backgroundColor: '#fff0f0', color: '#b91c1c', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>3. Darbas šventinėmis dienomis (Dvigubas laikas)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #b91c1c', textAlign: 'left', fontSize: '10px', color: '#b91c1c' }}>
                <th style={{ padding: '4px' }}>Data</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>KM (val.)</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Pakr. (val.)</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Deg. (val.)</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Iš viso val.</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => {
                const hKmVal = Number(d.km || 0) * 0.015;
                const hLoadVal = Number(d.loads || 0) * 2;
                const hStationVal = (Number(d.stations || 0) * 20) / 60;
                const hDayTotal = hKmVal + hLoadVal + hStationVal;

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #fee2e2', fontSize: '11px' }}>
                    <td style={{ padding: '6px 4px' }}>{d.date}</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{d.km} ({hKmVal.toFixed(2)})</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{d.loads} ({hLoadVal.toFixed(2)})</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{d.stations} ({hStationVal.toFixed(2)})</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold' }}>{hDayTotal.toFixed(2)} val.</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p style={{ fontSize: '9px', color: '#b91c1c', fontStyle: 'italic', marginTop: '5px' }}>* Šventinių dienų valandos dauginamos iš 2 skaičiuojant galutinį atlygį.</p>
        </div>
      )}

      {/* 5. FINANSINĖ DALIS */}
      <div style={{ marginTop: '30px', backgroundColor: '#fdfdfd', border: '1px solid #ddd', padding: '15px' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>Finansinė suvestinė (EUR)</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Bazinis užmokestis (KM):</span>
          <span>{kmPay.toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Už sugaištą laiką (Valandos):</span>
          <span>{(loadPay + stationPay + extraPay).toFixed(2)} €</span>
        </div>
        {nightPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Priedas už naktinį darbą (naktys):</span>
            <span>{nightPay.toFixed(2)} €</span>
          </div>
        )}
        {sleepPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Kompensacija už nakvynes:</span>
            <span>{sleepPay.toFixed(2)} €</span>
          </div>
        )}
        {holidayPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#b91c1c', fontWeight: 'bold' }}>
            <span>Priedas už šventines dienas (x2):</span>
            <span>{holidayPay.toFixed(2)} €</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #000', fontSize: '18px', fontWeight: 'bold' }}>
          <span>IŠ VISO (į rankas):</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* 6. PARAŠAS */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '10px', marginBottom: '5px', color: '#666' }}>Patvirtinta vairuotojo parašu:</p>
          <div style={{ width: '200px', height: '80px', border: '1px solid #ccc', marginBottom: '5px' }}>
            {signature && (
              <img src={signature} alt="Parašas" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )}
          </div>
          <p style={{ fontWeight: 'bold', margin: 0 }}>{name} {surname}</p>
          <p style={{ fontSize: '9px', color: '#999' }}>ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}