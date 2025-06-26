const getEventsBySessionId = `
  SELECT 
    e.event_id,
    e.session_id,
    e.gender,
    et.stroke,
    et.distance,
    et.is_relay
  FROM events e
  JOIN event_type et ON e.event_type_id = et.event_type_id
  WHERE e.session_id = $1
  ORDER BY e.event_id
`;

const getRankingByEventId = `
  SELECT 
    r.resultid,
    r.swimtime,
    r.lane,
    a.athleteid,
    a.first_name,
    a.last_name,
    c.shortname AS club,
    h.heatid
  FROM results r
  JOIN athletes a ON r.athleteid = a.athleteid
  JOIN heats h ON r.heatid = h.heatid
  JOIN clubs c ON a.clubid = c.club_id
  WHERE h.event_id = $1 AND r.swimtime IS NOT NULL
  ORDER BY 
    CAST(split_part(r.swimtime, ':' , 1) AS INTEGER) * 3600 +
    CAST(split_part(r.swimtime, ':' , 2) AS INTEGER) * 60 +
    CAST(split_part(r.swimtime, ':' , 3) AS NUMERIC)
`;


module.exports = {
  getEventsBySessionId,
  getRankingByEventId,
};
