const getHeatsByEventId = `
  SELECT heatid, event_id, heat_number, heat_order, heat_daytime, heat_status
  FROM heats
  WHERE event_id = $1
  ORDER BY heat_order ASC
`;

module.exports = {
  getHeatsByEventId,
};
