import React, { useEffect, useState } from 'react';
import { useHeats } from '../../hooks/useHeats';
import HeatItem from '../HeatItem/HeatItem';
import styles from './EventItem.module.scss';
import Expandable from '../Expandable/Expandable';
import swimmer from '../../assets/icons/swimmer.png';

const EventItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false);
  const { heats, loading, error } = useHeats(event.event_id, expanded);

  return (
    <div className={styles.eventItem}>
      <div className={styles.eventHeader} onClick={() => setExpanded(!expanded)}>
        <img src={swimmer} /><p>{event.distance}m {event.stroke} - {event.gender}</p>
      </div>

      <Expandable isOpen={expanded}>
        {loading && <p>Carregando séries...</p>}
        {error && <p>Erro ao carregar heats.</p>}
        <div className={styles.heatList}>
          {heats.map((heat) => (
            <HeatItem key={heat.heatid} heat={heat} />
          ))}
        </div>
      </Expandable>
    </div>
  );
};

export default EventItem;
