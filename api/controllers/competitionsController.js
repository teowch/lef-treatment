const pool = require('../db');
const queries = require('../queries/competitionsQueries');

const getCompetitions = async (req, res) => {
  try {
    const result = await pool.query(queries.getAllCompetitions);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar competições:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const getCompetitionById = async (req, res) => {
  const competitionId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getCompetitionById, [competitionId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Competição não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar competição:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

const getSessionsByCompetitionId = async (req, res) => {
  const competitionId = parseInt(req.params.id);

  try {
    const result = await pool.query(queries.getSessionsByCompetitionId, [competitionId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar sessões da competição:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};


module.exports = {
  getCompetitions,
  getCompetitionById,
  getSessionsByCompetitionId
};
