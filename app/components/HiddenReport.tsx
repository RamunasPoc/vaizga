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
        width: '210mm', // A4 formatas
        minHeight: '297mm',
        background: '#ffffff',
        color: '#000000',
        padding: '40px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.5',
      }}
    >
      {/* Dokumento viršūnė */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Darbo Ataskaita</h1>
          <p style={{ color: '#666', margin: 0 }}>Sukurta naudojant Vaizga App</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{name} {surname}</p>
          <p style={{ margin: 0, color: '#666' }}>{new Date().toLocaleDateString('lt-LT')}</p>
        </div>
      </div>

      {/* Pagrindinė suvestinė */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', fontWeight: 'bold' }}>1. PAGRINDINIAI DUOMENYS</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 0' }}>Nuvažiuoti kilometrai:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{km || 0} km</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Pakrovimai terminale (2 val./vnt):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{loads || 0} vnt. ({loadHours} val.)</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>Degalinės (20 min./vnt):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {stations || 0} vnt. ({(Number(stations || 0) * 20 / 60).toFixed(2)} val.)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Papildomi darbai */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', fontWeight: 'bold' }}>2. PAPILDOMI DARBAI</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#f9f9f9' }}>
                <th style={{ padding: '6px', border: '1px solid #eee', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '6px', border: '1px solid #eee', textAlign: 'left' }}>Aprašymas</th>
                <th style={{ padding: '6px', border: '1px solid #eee', textAlign: 'right' }}>Valandos</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={i}>
                  <td style={{ padding: '6px', border: '1px solid #eee' }}>{w.date}</td>
                  <td style={{ padding: '6px', border: '1px solid #eee' }}>{w.description}</td>
                  <td style={{ padding: '6px', border: '1px solid #eee', textAlign: 'right' }}>{w.hours} val.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Šventinės dienos */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '14px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px', fontWeight: 'bold', color: '#b91c1c' }}>3. ŠVENTINĖS DIENOS (X2)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ background: '#fef2f2' }}>
                <th style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>KM</th>
                <th style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>Pakr.</th>
                <th style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>Deg.</th>
                <th style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>Laikas (val.)</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => (
                <tr key={i}>
                  <td style={{ padding: '6px', border: '1px solid #fee2e2' }}>{d.date}</td>
                  <td style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>{d.km}</td>
                  <td style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>{d.loads}</td>
                  <td style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>{d.stations}</td>
                  <td style={{ padding: '6px', border: '1px solid #fee2e2', textAlign: 'right' }}>
                    {( (Number(d.loads || 0) * 2) + (Number(d.stations || 0) * 20 / 60) ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Finansinė suvestinė */}
      <div style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '14px', marginBottom: '10px', fontWeight: 'bold' }}>APSKAIČIUOTAS ATLYGIS (Bruto)</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Už kilometrus:</span>
          <span>{kmPay.toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Už pakrovimus ir degalines:</span>
          <span>{(loadPay + stationPay).toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Už papildomus darbus:</span>
          <span>{extraPay.toFixed(2)} €</span>
        </div>
        {holidayPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#b91c1c' }}>
            <span>Priedas už šventines dienas (x2):</span>
            <span>{holidayPay.toFixed(2)} €</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '2px solid #000', fontSize: '18px', fontWeight: 'bold' }}>
          <span>IŠ VISO:</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      <div style={{ marginTop: '40px', fontSize: '10px', color: '#999', textAlign: 'center' }}>
        Patvirtinu, kad pateikti duomenys apie atliktą darbą yra teisingi.
      </div>
    </div>
  );
}