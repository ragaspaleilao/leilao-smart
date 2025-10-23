require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const searchRouter = require('./routes/search');
const healthRouter = require('./routes/health');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/leilaosmart';
mongoose.connect(MONGO_URI).then(()=>console.log('Mongo connected')).catch(e=>console.error('Mongo error', e));

app.use('/api/search', searchRouter);
app.use('/health', healthRouter);

//
// 🔍 Rota de teste da conexão com o MongoDB
app.get('/api/test', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      status: 'connected',
      db: mongoose.connection.name,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/', (req, res) => res.json({ service: 'LeilaoSmart Backend', status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Backend listening on ${PORT}`));
