'use client';

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
}

export default function HiddenReport(props: Props) {
  return (
    <div
      id="report"
      style={{
        position: 'absolute',
        left: '-9999px',
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        width: '210mm',
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 'bold' }}>
        Vairuotojo darbo ataskaita
      </h1>

      <p>Vardas: {props.name || '-'}</p>
      <p>Pavardė: {props.surname || '-'}</p>
      <p>Nuvažiuoti km: {props.km || '-'}</p>
      <p>
        Pakrovimai terminale: {props.loads || '-'} ({props.loadHours} val.)
      </p>
      <p>Degalinės: {props.stations || '-'}</p>
      <p>Papildomi darbai: {props.extraWorkDesc || '-'}</p>
      <p>Papildomo darbo valandos: {props.extraHours || '-'}</p>

      <p style={{ fontWeight: 'bold', marginTop: 10 }}>
        Bendra alga: {props.total.toFixed(2)} €
      </p>
    </div>
  );
}
