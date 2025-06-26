import { useState, useEffect } from 'react';
import api from '../services/api';

export function useSplits(resultid) {
  const [splits, setSplits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resultid) return;

    const fetchSplits = async () => {
      try {
        const response = await api.get(`/results/${resultid}/splits`);
        setSplits(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSplits();
  }, [resultid]);

  return { splits, loading, error };
}
