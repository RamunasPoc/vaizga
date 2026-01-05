'use client';

import { SalaryCalculatorState } from '../hooks/useSalaryCalculator';

export default function HiddenReport({
  name,
  surname,
  km,
  loads,
  stations,
  nightShifts,
  sleepOvers, // Pridėta
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
  sleepPay,   // Pridėta
  signature,
}: SalaryCalculatorState) {
  return (
    <div
      id="report"
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '210mm',
        minHeight: '297mm',
        background: '#ffffff',
        color: '#000000',
        padding: '25mm',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '12px',
        lineHeight: '1.5',
        zIndex: -500,
        opacity: 0.02, 
        pointerEvents: 'none',
      }}
    >
      {/* Dokumento viršūnė */}
      <div style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>Darbo Ataskaita</h1>
          <p style={{ color: '#666', margin: 0, fontSize: '10px' }}>Sugeneruota per Vaizga App • {new Date().toLocaleTimeString('lt-LT')}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase' }}>{name || '—'} {surname || ''}</p>
          <p style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>{new Date().toLocaleDateString('lt-LT')}</p>
        </div>
      </div>

      {/* 1. Pagrindiniai duomenys */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '13px', backgroundColor: '#eee', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>1. Pagrindiniai duomenys (Mėnesio suvestinė)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 0' }}>Bendri nuvažiuoti kilometrai:</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{km || 0} km</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 0' }}>Pakrovimai terminale (2 val./vnt):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{loads || 0} vnt. ({loadHours || 0} val.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 0' }}>Degalinės (20 min./vnt):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {stations || 0} vnt. ({(Number(stations || 0) * 20 / 60).toFixed(2)} val.)
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 0' }}>Naktinės pamainos (+20€ priedas):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{nightShifts || 0} nakt.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '8px 0' }}>Nakvynės vilkike (+20€ priedas):</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{sleepOvers || 0} nakt.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. Papildomi darbai */}
      {extraWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '13px', backgroundColor: '#eee', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>2. Papildomi darbai</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Data</th>
                <th style={{ padding: '8px' }}>Aprašymas</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Valandos</th>
              </tr>
            </thead>
            <tbody>
              {extraWorks.map((w, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                  <td style={{ padding: '8px' }}>{w.date}</td>
                  <td style={{ padding: '8px' }}>{w.description}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{w.hours} val.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Šventinės dienos */}
      {holidayWorks.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '13px', backgroundColor: '#fef2f2', color: '#b91c1c', padding: '5px 10px', marginBottom: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>3. Šventinės dienos (Dvigubas tarifas)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #fee2e2', textAlign: 'left', color: '#b91c1c' }}>
                <th style={{ padding: '8px' }}>Data</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>KM (val.)</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Pakr.</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Deg.</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Bendra dienos trukmė</th>
              </tr>
            </thead>
            <tbody>
              {holidayWorks.map((d, i) => {
                const kmTimeEquivalent = Number(d.km || 0) * 0.015;
                const loadTime = Number(d.loads || 0) * 2;
                const stationTime = (Number(d.stations || 0) * 20) / 60;
                const totalDayHours = kmTimeEquivalent + loadTime + stationTime;

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #fff5f5' }}>
                    <td style={{ padding: '8px' }}>{d.date}</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {d.km} km ({kmTimeEquivalent.toFixed(2)} val.)
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>{d.loads} vnt.</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>{d.stations} vnt.</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>
                      {totalDayHours.toFixed(2)} val.
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p style={{ fontSize: '9px', color: '#b91c1c', marginTop: '4px', fontStyle: 'italic' }}>
            * Šventinę dieną visi įkainiai (įskaitant kilometrus paverstus valandomis) dauginami iš 2.
          </p>
        </div>
      )}

      {/* 4. Finansinė suvestinė */}
      <div style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', border: '1px solid #eee' }}>
        <h2 style={{ fontSize: '13px', marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>Apskaičiuotas atlygis po mokesčių (į rankas)</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Bazinis užmokestis už kilometrus (0.114 €/km):</span>
          <span>{kmPay.toFixed(2)} €</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span>Užmokestis už laiką (Pakr./Deg./Papildomi):</span>
          <span>{(loadPay + stationPay + extraPay).toFixed(2)} €</span>
        </div>

        {sleepPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Kompensacija už nakvynes ({sleepOvers} nakt.):</span>
            <span>{sleepPay.toFixed(2)} €</span>
          </div>
        )}

        {nightPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Priedas už naktines pamainas ({nightShifts} nakt.):</span>
            <span>{nightPay.toFixed(2)} €</span>
          </div>
        )}

        {holidayPay > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#b91c1c', fontWeight: 'bold' }}>
            <span>Papildomas priedas už šventines dienas (x2):</span>
            <span>{holidayPay.toFixed(2)} €</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #000', fontSize: '20px', fontWeight: 'bold' }}>
          <span>GALUTINĖ SUMA:</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      {/* 5. Parašo sekcija */}
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '200px', 
            height: '80px', 
            border: '1px solid #000', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#fff',
            position: 'relative',
            marginBottom: '5px'
          }}>
            {signature ? (
              <img 
                id="report-signature-img"
                src={signature} 
                alt="Vairuotojo parašas" 
                crossOrigin="anonymous"
                style={{ 
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }} 
              />
            ) : (
              <div style={{ color: '#ccc', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '12px' }}>PATVIRTINTA ELEKTRONINIU BŪDU</p>
                <p style={{ margin: 0, fontSize: '9px' }}>BE FIZINIO PARAŠO</p>
              </div>
            )}
            
            <span style={{ position: 'absolute', bottom: '2px', right: '5px', fontSize: '7px', color: '#999', textTransform: 'uppercase' }}>
              ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>

          <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>{name} {surname}</p>
          <p style={{ margin: '2px 0', fontSize: '10px', color: '#666', fontStyle: 'italic' }}>Vairuotojo patvirtinimas</p>
          
          <div style={{ marginTop: '10px', fontSize: '10px', backgroundColor: '#333', color: '#fff', padding: '3px 10px', borderRadius: '2px', display: 'inline-block' }}>
            {new Date().toLocaleString('lt-LT', { dateStyle: 'long', timeStyle: 'short' })}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', fontSize: '9px', color: '#aaa', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        Šis dokumentas yra automatiškai sugeneruota darbo laiko ir užmokesčio suvestinė. 
        Pateikdamas šią ataskaitą, vairuotojas patvirtina duomenų teisingumą.
      </div>
    </div>
  );
}