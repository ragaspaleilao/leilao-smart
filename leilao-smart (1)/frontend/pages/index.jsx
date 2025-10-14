import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const search = async (q) => {
    setLoading(true);
    try {
      const resp = await axios.get(`${API}/api/search`, { params: { q: q }, timeout: 30000 });
      setResults(resp.data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">LeilãoSmart</h1>
          <nav className="text-sm text-gray-600">Busca de imóveis em leilão</nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <SearchBar onSearch={(q) => { setQuery(q); search(q); }} />

        <section className="mt-6">
          {loading && <div className="text-sm text-gray-500">Buscando imóveis...</div>}
          {!loading && results.length === 0 && <div className="text-sm text-gray-500">Nenhum resultado ainda. Faça uma busca.</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {results.map((r) => (
              <ListingCard key={r.id || r.auctionUrl} item={r} />
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">LeilãoSmart — protótipo</footer>
    </div>
  );
}
