const pool = require('../db');
const queries = require('../queries/splitsQueries');

const getSplitsByResultId = async (req, res) => {
  const resultId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getSplitsByResultId, [resultId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar splits:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

module.exports = {
  getSplitsByResultId,
};
