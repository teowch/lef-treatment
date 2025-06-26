const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const competitionsRoutes = require('./routes/competitions');
const eventsRoutes = require('./routes/events');
const heatsRoutes = require('./routes/heats');
const resultsRoutes = require('./routes/results');
const splitsRoutes = require('./routes/splits');
const importRoutes = require('./routes/import');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use('/competitions', competitionsRoutes);
app.use('/', eventsRoutes);
app.use('/', heatsRoutes);
app.use('/', resultsRoutes);
app.use('/', splitsRoutes);
app.use('/', importRoutes);
app.use('/auth', authRoutes);

// Fallback para SPA (Single Page Application)
app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
