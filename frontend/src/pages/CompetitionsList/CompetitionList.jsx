import { useCompetitions } from '../../hooks/useCompetitions';
import CompetitionCard from '../../components/CompetitionCard/CompetitionCard';
import styles from './CompetitionList.module.scss';
import { useEffect, useRef } from 'react';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader';

function CompetitionsList() {
  const { competitions, loading, error } = useCompetitions();

  const scrollableRef = useRef(null);

  useEffect(() => {
    function ajustarAltura() {
      if (scrollableRef.current) {
        const offsetTop = scrollableRef.current.offsetTop;
        const alturaDisponivel = window.innerHeight - offsetTop;
        scrollableRef.current.style.height = `calc(${alturaDisponivel}px - 0.5rem)`;
        scrollableRef.current.style.overflowY = 'auto';
      }
    }

    ajustarAltura();
    window.addEventListener('resize', ajustarAltura);

    return () => {
      window.removeEventListener('resize', ajustarAltura);
    };
  }, [competitions]);

  if (loading) return <FullPageLoader />;
  if (error) return <p>Erro ao carregar competições.</p>;

  return (
    <div>
      <h1 className={styles.title}>Competições</h1>
      <div className={styles.competitionList} ref={scrollableRef}>
        {competitions.map(comp => (
          <CompetitionCard key={comp.competition_id} competition={comp} />
        ))}
      </div>
    </div>
  );
}

export default CompetitionsList;
