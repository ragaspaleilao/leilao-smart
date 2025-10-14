import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const q = state ? `${city}, ${state}` : city;
    onSearch(q);
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Cidade (ex: São Paulo)" className="flex-1 border p-2 rounded" />
        <input value={state} onChange={(e)=>setState(e.target.value)} placeholder="Estado (ex: SP)" className="w-28 border p-2 rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Buscar</button>
      </div>
    </form>
  );
}
