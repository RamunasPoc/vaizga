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
  // Pagalbinės funkcijos laiko konvertavimui
  const kmToHours = (kmValue: number | string) => Number(kmValue || 0) * 0.015;
  const stationToHours = (count: number | string) => (Number(count || 0) * 20) / 60;
  const loadToHours = (count: number | string) => Number(count || 0) * 2;

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
        fontSize: '11px', // Šiek tiek mažesnis šriftas, kad tilptų daugiau info
        lineHeight: '1.4',
        zIndex: -1000,
      }}
    >
      {/* 1. ANTRAŠTĖ */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>Išsami Darbo Laiko Ataskaita</h1>
          <p style={{ color: '#666', margin: 0, fontSize: '10px' }}>Sugeneruota: {new Date().toLocaleDateString('lt-LT')} {new Date().toLocaleTimeString('lt-LT')}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{name || '—'} {surname || ''}</p>
          <p style={{ margin: 0, color: '#666', fontSize: '10px' }}>VAIRUOTOJO SUVESTINĖ</p>
        </div>
      </div>

      {/* 2. PAGRINDINĖ VEIKLA IR LAIKAS */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '11px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>1. Mėnesio veikla ir laiko sąnaudos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000', textAlign: 'left', fontSize: '10px' }}>
              <th style={{ padding: '6px 0' }}>Veikla</th>
              <th style={{ padding: '6px 0', textAlign: 'center' }}>Kiekis / Atstumas</th>
              <th style={{ padding: '6px 0', textAlign: 'right' }}>Laiko ekvivalentas</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Vairavimas (skaičiuojama 0.015 val./km):</td>
              <td style={{ textAlign: 'center' }}>{km || 0} km</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{kmToHours(km || 0).toFixed(2)} val.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Pakrovimai terminale (skaičiuojama 2.0 val./vnt.):</td>
              <td style={{ textAlign: 'center' }}>{loads || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{loadToHours(loads || 0).toFixed(2)} val.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>Degalinės / Pildymas (skaičiuojama 20 min./vnt.):</td>
              <td style={{ textAlign: 'center' }}>{stations || 0} vnt.</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{stationToHours(stations || 0).toFixed(2)} val.</td>
            </tr>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <td colSpan={2} style={{ padding: '10px 0', fontWeight: 'bold' }}>BENDRA PAGRINDINĖS VEIKLOS TRUKMĖ:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', borderBottom: '2px double #000' }}>
                {(kmToHours(km || 0) + loadToHours(loads || 0) + stationToHours(stations || 0)).toFixed(2)} val.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. PAPILDOMI DARBAI (VALANDINIS) */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '11px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>2. Papildomų darbų / pakrovimų detalizacija</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000', textAlign: 'left', fontSize: '10px' }}>
                <th style={{ padding: '6px 4px' }}>Data</th>
                <th style={{ padding: '6px 4px' }}>Aprašymas</th>
                <th style={{ padding: '6px 4px', textAlign: 'right' }}>Sugaištas laikas</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '6px 4px' }}>{w.date}</td>
                  <td style={{ padding: '6px 4px' }}>{w.description}</td>
                  <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold' }}>{Number(w.hours || 0).toFixed(2)} val.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. ŠVENTINĖS DIENOS (DVIGUBAS LAIKAS) */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '11px', backgroundColor: '#fff0f0', color: '#b91c1c', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>3. Darbas šventinėmis dienomis (Visi laikai dauginami iš 2)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #b91c1c', textAlign: 'left', fontSize: '9px', color: '#b91c1c' }}>
                <th style={{ padding: '4px' }}>Data</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>KM Laikas</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Pakr. Laikas</th>
                <th style={{ padding: '4px', textAlign: 'right' }}>Deg. Laikas</th>
                <th style={{ padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>Dienos suma (x2)</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => {
                const dayKmH = kmToHours(d.km || 0);
                const dayLoadH = loadToHours(d.loads || 0);
                const dayStatH = stationToHours(d.stations || 0);
                const dayTotal = (dayKmH + dayLoadH + dayStatH) * 2; // Padauginame iš 2 čia, kad matytųsi skaidriai

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #fee2e2' }}>
                    <td style={{ padding: '6px 4px' }}>{d.date}</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{dayKmH.toFixed(2)} val.</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{dayLoadH.toFixed(2)} val.</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right' }}>{dayStatH.toFixed(2)} val.</td>
                    <td style={{ padding: '6px 4px', textAlign: 'right', fontWeight: 'bold', color: '#b91c1c' }}>
                      {dayTotal.toFixed(2)} val.
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. PRIEDAI IR NAKTINĖS PAMAINOS */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '11px', backgroundColor: '#f4f4f4', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>4. Spec. priedai ir kompensacijos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Naktinės pamainos (22:00 - 06:00):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{nightShifts || 0} nakt. (+{nightPay.toFixed(2)} €)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>Nakvynės vilkike (kompensacija):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{sleepOvers || 0} nakt. (+{sleepPay.toFixed(2)} €)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. GALUTINĖ FINANSINĖ SUVESTINĖ */}
      <div style={{ marginTop: '20px', border: '2px solid #000', padding: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Užmokesčio dalis už nuvažiuotus kilometrus (bazinis):</span>
          <span>{kmPay.toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Užmokesčio dalis už sugaištas valandas (darbai):</span>
          <span>{(loadPay + stationPay + extraPay).toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Priedai už naktis ir nakvynes:</span>
          <span>{(nightPay + sleepPay).toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#b91c1c' }}>
          <span>Papildomas užmokestis už šventines dienas:</span>
          <span>{holidayPay.toFixed(2)} €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #000', fontSize: '16px', fontWeight: 'bold' }}>
          <span>GALUTINĖ SUMA IŠMOKĖJIMUI (į rankas):</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* 7. PARAŠAS */}
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '9px', marginBottom: '5px' }}>Patvirtinu duomenų teisingumą:</p>
          <div style={{ width: '180px', height: '70px', border: '1px solid #ccc', marginBottom: '5px' }}>
            {signature && <img src={signature} alt="Parašas" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
          </div>
          <p style={{ fontWeight: 'bold', margin: 0, fontSize: '12px' }}>{name} {surname}</p>
        </div>
      </div>
    </div>
  );
}