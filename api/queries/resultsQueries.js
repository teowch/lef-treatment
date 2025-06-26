const getResultsByHeatId = `
  SELECT 
    r.resultid,
    r.lane,
    r.entry_time,
    r.swimtime,
    r.points,
    a.athleteid,
    a.first_name,
    a.last_name,
    a.gender,
    a.birth_date,
    c.name AS club_name,
    c.shortname AS club_shortname
  FROM results r
  LEFT JOIN athletes a ON r.athleteid = a.athleteid
  LEFT JOIN clubs c ON a.clubid = c.club_id
  WHERE r.heatid = $1
  ORDER BY r.lane
`;

module.exports = {
  getResultsByHeatId,
};
