// src/hooks/useCompetitions.js
import { useEffect, useState } from 'react';
import api from '../services/api';

export function useCompetitions() {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/competitions')
      .then(res => {
        setCompetitions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar competições:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { competitions, loading, error };
}
