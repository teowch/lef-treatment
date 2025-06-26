import { useState, useEffect } from 'react';
import api from '../services/api';

export function useResults(heatId) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await api.get(`/heats/${heatId}/results`);
        setResults(response.data);
      } catch (err) {
        console.error("Erro ao buscar resultados:", err);
      } finally {
        setLoading(false);
      }
    }

    if (heatId) {
      fetchResults();
    }
  }, [heatId]);

  return { results, loading };
}
