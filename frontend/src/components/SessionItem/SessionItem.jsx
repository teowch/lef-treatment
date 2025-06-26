import React, { useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import EventItem from '../EventItem/EventItem';
import styles from './SessionItem.module.scss';
import Expandable from '../Expandable/Expandable';

const SessionItem = ({ session }) => {
  const [expanded, setExpanded] = useState(false);
  const { events, loading, error } = useEvents(session.session_id, expanded);

  return (
    <div className={styles.sessionItem}>
      <div className={styles.sessionHeader} onClick={() => setExpanded(!expanded)}>
        <h3>{session.session_order}ª Etapa</h3>
        <span>{session.session_date}</span>
      </div>

      <Expandable isOpen={expanded} className={styles.heatContent}>
          {loading && <p>Carregando eventos...</p>}
          {error && <p>Erro ao carregar eventos.</p>}
        <div className={styles.eventList}>
          {events.map((event) => (
            <EventItem key={event.event_id} event={event} />
          ))}
        </div>
      </Expandable>
    </div>
  );
};

export default SessionItem;
