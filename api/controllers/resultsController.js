const pool = require('../db');
const queries = require('../queries/resultsQueries');

const getResultsByHeatId = async (req, res) => {
  const heatId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getResultsByHeatId, [heatId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar resultados da série:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = {
  getResultsByHeatId,
};
