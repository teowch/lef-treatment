import React, { use } from 'react';
import { useParams } from 'react-router-dom';
import SessionItem from '../../components/SessionItem/SessionItem';
import { useCompetitionDetails } from '../../hooks/useCompetitionDetails';
import styles from './CompetitionDetails.module.scss';
import place from '../../assets/icons/place.png';
import calendar from '../../assets/icons/calendar.png';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader';

const CompetitionDetails = () => {
  const { id: competitionId } = useParams();
  const { competition, sessions, loading, error } = useCompetitionDetails(competitionId);

  if (loading) return <FullPageLoader />;
  if (error) return <p>Erro ao carregar competição.</p>;
  if (!competition) return <p>Competição não encontrada.</p>;

  return (
    <div>
      <div className={styles.competitionHeader}>
        <h1>{competition.name}</h1>
        <div className={styles.info}>
          <img src={place}/>
          <p>{competition.city} - {competition.nation}</p>
        </div>
        <div className={styles.info}>
          <img src={calendar}/>
          <p>{competition.start_date} – {competition.end_date}</p>
        </div>
      </div>
      <div className={styles.sessionList}>
        {sessions.map((session) => (
          <SessionItem key={session.session_id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default CompetitionDetails;
