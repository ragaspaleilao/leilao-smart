import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const resp = await axios.get(`${API}/api/search`, { params: { q: id } });
        const results = resp.data.results || [];
        const found = results.find(r => (r.id === id || r.auctionUrl === id));
        setItem(found || null);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!item) return <div className="p-6">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.address}</p>
      <div className="mt-4">
        <img src={item.images && item.images[0]} alt="thumb" className="w-full h-64 object-cover rounded" />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Valores</h3>
          <p>Valor de leilão: <strong>R$ {item.auctionValue ? item.auctionValue.toLocaleString() : '—'}</strong></p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Status</h3>
          <p>{item.status || '—'}</p>
          <p>Modalidade: {item.modality || '—'}</p>
        </div>
      </div>

    </div>
  );
}
