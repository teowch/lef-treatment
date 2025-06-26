import React, { useState } from 'react';
import { useResults } from '../../hooks/useResults';
import ResultItem from '../ResultItem/ResultItem';
import styles from './HeatItem.module.scss';
import arrow_down from '../../assets/icons/arrow-down.png';
import Expandable from '../Expandable/Expandable';

const HeatItem = ({ heat }) => {
  const [expanded, setExpanded] = useState(false);
  const { results, loading, error } = useResults(heat.heatid, expanded);

  return (
    <div className={`${styles.heatItem} ${expanded ? styles.expanded : ''}`}>
      <div className={styles.heatHeader} onClick={() => setExpanded(!expanded)}>
        <img className={expanded ? styles.rotate : ''} src={arrow_down} />
        {heat.heat_number}ª série - {heat.heat_daytime}
      </div>
      <Expandable isOpen={expanded}>
        {loading && <p>Carregando resultados...</p>}
        {error && <p>Erro ao carregar resultados.</p>}
        <div className={styles.resultList}>
          {results.map((r) => (
              <ResultItem key={r.resultid} result={r} />
          ))}
        </div>
      </Expandable>
    </div>
  );
};

export default HeatItem;
