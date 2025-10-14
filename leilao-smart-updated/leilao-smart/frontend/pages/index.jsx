import { useState } from 'react';
import axios from 'axios';
export default function Home(){
  const [city,setCity]=useState(''); const [state,setState]=useState('');
  const [results,setResults]=useState([]); const [loading,setLoading]=useState(false);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const doSearch = async ()=>{ setLoading(true); try{ const r=await axios.get(`${API}/api/search`,{params:{cidade:city,estado:state}}); setResults(r.data.results||[]);}catch(e){console.error(e); setResults([]);} finally{setLoading(false);} };
  return (<div className="min-h-screen p-6 bg-gray-100"><h1 className="text-2xl font-bold mb-4">LeilãoSmart</h1><div className="bg-white p-4 rounded shadow flex gap-2"><input value={city} onChange={e=>setCity(e.target.value)} placeholder="Cidade" className="p-2 border rounded flex-1"/><input value={state} onChange={e=>setState(e.target.value)} placeholder="Estado (ex: SP)" className="p-2 border w-32 rounded"/><button onClick={doSearch} className="px-4 py-2 bg-blue-600 text-white rounded">Buscar</button></div><div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">{loading && <div>Buscando...</div>}{!loading && results.map(item=> (<div key={item.id} className="bg-white p-3 rounded shadow"><img src={item.images&&item.images[0]} alt="thumb" className="w-full h-40 object-cover rounded"/><h3 className="font-semibold mt-2">{item.title}</h3><p className="text-sm text-gray-600">{item.address}</p><p className="mt-1">Leilão: <strong>R$ {item.auctionValue?.toLocaleString()}</strong></p></div>))}</div></div>); }
