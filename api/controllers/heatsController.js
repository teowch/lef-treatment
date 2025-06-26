const pool = require('../db');
const queries = require('../queries/heatsQueries');

const getHeatsByEventId = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getHeatsByEventId, [eventId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar heats da prova:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = {
  getHeatsByEventId,
};
