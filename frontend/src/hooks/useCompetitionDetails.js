import { useState, useEffect } from 'react';
import api from '../services/api';

export function useCompetitionDetails(competitionId) {
  const [competition, setCompetition] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const [competitionRes, sessionsRes] = await Promise.all([
          api.get(`/competitions/${competitionId}`),
          api.get(`/competitions/${competitionId}/sessions`)
        ]);
        setCompetition(competitionRes.data);
        setSessions(sessionsRes.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da competição:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [competitionId]);

  return { competition, sessions, loading };
}
