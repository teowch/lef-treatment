import { useState, useEffect } from 'react';
import api from '../services/api';

export function useHeats(eventId) {
  const [heats, setHeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeats() {
      try {
        const response = await api.get(`/events/${eventId}/heats`);
        setHeats(response.data);
      } catch (err) {
        console.error("Erro ao buscar heats:", err);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      fetchHeats();
    }
  }, [eventId]);

  return { heats, loading };
}