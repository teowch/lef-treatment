const createUser = `
  INSERT INTO users (email, password_hash)
  VALUES ($1, $2)
  RETURNING user_id, email, created_at;
`;

const findUserByEmail = `
  SELECT * FROM users
  WHERE email = $1;
`;

module.exports = {
  createUser,
  findUserByEmail,
};
