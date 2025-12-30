interface Props {
  name: string;
  surname: string;
  km: number | '';
  loads: number | '';
  stations: number | '';
  extraWorkDesc: string;
  extraHours: number | '';
  loadHours: number;
  total: number;

  kmPay: number;
  loadPay: number;
  stationPay: number;
  extraPay: number;
}

export default function HiddenReport({
  name,
  surname,
  km,
  loads,
  stations,
  extraWorkDesc,
  extraHours,
  loadHours,
  total,
  kmPay,
  loadPay,
  stationPay,
  extraPay,
}: Props) {
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

      {extraWorkDesc && (
        <p><b>Papildomi darbai:</b> {extraWorkDesc}</p>
      )}

      {extraHours !== '' && (
        <p><b>Papildomo darbo valandos:</b> {extraHours}</p>
      )}

      <hr style={{ margin: '16px 0' }} />

      <h2 style={{ fontSize: 14, marginBottom: 8 }}>Algos sudėtis</h2>

      <p>KM: {kmPay.toFixed(2)} €</p>
      <p>Terminalai: {loadPay.toFixed(2)} €</p>
      <p>Degalinės: {stationPay.toFixed(2)} €</p>
      <p>Papildomi darbai: {extraPay.toFixed(2)} €</p>

      <hr style={{ margin: '12px 0' }} />

      <p style={{ fontSize: 14, fontWeight: 'bold' }}>
        Bendra alga: {total.toFixed(2)} €
      </p>
    </div>
  );
}
