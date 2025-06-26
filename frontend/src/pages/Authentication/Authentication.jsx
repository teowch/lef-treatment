import { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import styles from './Authentication.module.scss';

export default function Authentication({ login = false, register = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginFn, register: registerFn } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login) {
        await loginFn(email, password);
      } else if (register) {
        await registerFn(email, password);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const title = login ? 'Login' : 'Cadastro';
  const buttonLabel = login ? 'Entrar' : 'Cadastrar';
  const helper = login
    ? <Link className={styles.helper} to='/register'>Ainda não tenho uma conta</Link>
    : <Link className={styles.helper} to='/login'>Já tenho uma conta</Link>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title}</h2>

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      {helper}

      <button className={styles.button} type="submit">{buttonLabel}</button>

      {error && <p className={styles.error} style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
