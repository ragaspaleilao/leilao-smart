import Link from 'next/link';

export default function ListingCard({ item }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <img src={item.images && item.images[0]} alt="thumb" className="w-full h-44 object-cover" />
      <div className="p-3">
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.address}</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <div className="text-sm">Leilão: <strong>R$ {item.auctionValue ? item.auctionValue.toLocaleString() : '—'}</strong></div>
            <div className="text-xs text-gray-500">{item.status}</div>
          </div>
          <Link href={`/property/${encodeURIComponent(item.id || item.auctionUrl)}`} className="px-3 py-1 bg-blue-600 text-white rounded">Detalhes</Link>
        </div>
      </div>
    </div>
  );
}
