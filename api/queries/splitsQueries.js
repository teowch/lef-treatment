const getSplitsByResultId = `
  SELECT 
    split_id,
    result_id,
    distance,
    swimtime
  FROM splits
  WHERE result_id = $1
  ORDER BY distance ASC
`;

module.exports = {
  getSplitsByResultId,
};
