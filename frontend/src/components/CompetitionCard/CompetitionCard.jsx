import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CompetitionCard.module.scss';
import place from '../../assets/icons/place.png';
import calendar from '../../assets/icons/calendar.png';

export default function CompetitionCard({ competition }) {
  const { competition_id, name, city, nation, start_date, end_date } = competition;

  return (
    <Link className={styles.competitionCard} to={`/competitions/${competition_id}`}>
      <h2>{name}</h2>
      <div className={styles.info}><img src={place} /><p>{city} – {nation}</p></div>
      <div className={styles.info}><img src={calendar} /><p>{start_date} – {end_date}</p></div>
    </Link>
  );
}
