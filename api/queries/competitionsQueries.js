const getAllCompetitions = `
  SELECT competition_id, name, city, nation,
    start_date AS order_date,
    TO_CHAR(start_date, 'DD/MM/YYYY') AS start_date,
    TO_CHAR(end_date, 'DD/MM/YYYY') AS end_date,
    course
  FROM competitions
  ORDER BY order_date
`;

const getCompetitionById = `
  SELECT competition_id, name, city, nation,
  TO_CHAR(start_date, 'DD/MM/YYYY') AS start_date,
  TO_CHAR(end_date, 'DD/MM/YYYY') AS end_date,
  course
  FROM competitions
  WHERE competition_id = $1
`;

const getSessionsByCompetitionId = `
  SELECT session_id, session_order,
  TO_CHAR(session_date, 'DD/MM/YYYY') AS session_date,
  competition_id
  FROM sessions
  WHERE competition_id = $1
  ORDER BY session_order ASC
`;

module.exports = {
  getAllCompetitions,
  getCompetitionById,
  getSessionsByCompetitionId,
};
