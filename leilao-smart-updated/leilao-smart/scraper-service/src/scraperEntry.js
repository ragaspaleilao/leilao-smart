const express = require('express');
const app = express();
app.use(express.json());
app.get('/scrape', async (req, res) => {
  const { estado = '', cidade = '', maxPages = 1 } = req.query;
  const mock = [
    { id: `CAIXA-${cidade||'GEN'}-001`, title: `Apartamento demo - ${cidade||'Cidade'} ${estado||''}`, address: `${cidade||'Centro'}, ${estado||''}`, auctionValue: 350000, auctionUrl: 'https://example/1', images: ['https://picsum.photos/seed/demo1/800/600'], modality: '1º Leilão', status: 'Aberto', occupied: false, source:'Caixa' },
    { id: `CAIXA-${cidade||'GEN'}-002`, title: `Casa demo - ${cidade||'Cidade'} ${estado||''}`, address: `${cidade||'Bairro'} - ${estado||''}`, auctionValue: 480000, auctionUrl: 'https://example/2', images: ['https://picsum.photos/seed/demo2/800/600'], modality: '2º Leilão', status: 'Aberto', occupied: true, source:'Caixa' }
  ];
  const count = Math.max(1, Math.min(mock.length, maxPages*2));
  res.json({ results: mock.slice(0, count) });
});
app.get('/health', (req,res) => res.json({ ok: true }));
const PORT = process.env.SCRAPER_PORT || 4020;
app.listen(PORT, ()=> console.log(`Scraper listening on ${PORT}`));
