const pool = require('../db');
const queries = require('../queries/eventsQueries');

const getEventsBySessionId = async (req, res) => {
  const sessionId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getEventsBySessionId, [sessionId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar eventos da sessão:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const getRankingByEventId = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getRankingByEventId, [eventId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar ranking do evento:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};


module.exports = {
  getEventsBySessionId,
  getRankingByEventId
};
