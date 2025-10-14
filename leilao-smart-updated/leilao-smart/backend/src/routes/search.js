const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const estado = req.query.estado || req.query.state || '';
    const cidade = req.query.cidade || req.query.city || '';
    const maxPages = Number(req.query.maxPages) || 3;
    const SCRAPER_URL = process.env.SCRAPER_URL || 'http://localhost:4020';
    const url = `${SCRAPER_URL}/scrape`;
    const resp = await axios.get(url, { params: { estado, cidade, maxPages }, timeout: 60000 });
    const results = resp.data.results || [];
    const enhanced = results.map(item => ({
      id: item.id,
      title: item.title,
      address: item.address,
      auctionValue: item.auctionValue,
      auctionUrl: item.auctionUrl,
      images: item.images || [],
      source: item.source || 'Caixa',
      status: item.status || null,
      occupied: item.occupied || null,
      marketComparison: { marketAverage: item.auctionValue ? Math.round(item.auctionValue * 1.25) : null },
      debts: { iptu: 0, condominium: 0, judicial: 0 }
    }));
    res.json({ results: enhanced });
  } catch (err) {
    console.error('Search error', err && err.message || err);
    res.status(500).json({ error: 'Erro ao buscar leilões' });
  }
});

module.exports = router;
