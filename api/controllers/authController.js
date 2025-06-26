const pool = require('../db');
const queries = require('../queries/authQueries');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query(queries.findUserByEmail, [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(queries.createUser, [email, passwordHash]);

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query(queries.findUserByEmail, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Para simplificação, sem JWT agora
    res.status(200).json({
      user_id: user.user_id,
      email: user.email,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
