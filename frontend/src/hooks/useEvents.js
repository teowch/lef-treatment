import { useState, useEffect } from 'react';
import api from '../services/api';

export function useEvents(sessionId) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get(`/sessions/${sessionId}/events`);
        setEvents(response.data);
      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
      } finally {
        setLoading(false);
      }
    }

    if (sessionId) {
      fetchEvents();
    }
  }, [sessionId]);

  return { events, loading };
}
