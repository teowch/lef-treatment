import React from 'react';
import { useSplits } from '../../hooks/useSplits';
import styles from './SplitList.module.scss';

export default function SplitList({ resultid }) {
  const { splits, loading, error } = useSplits(resultid);

  if (loading) return <div>Carregando parciais...</div>;

  if (!Array.isArray(splits)) return <div>Erro ao carregar splits.</div>;

  if (error) return <div>Erro ao carregar parciais: {error.message}</div>;

  if (splits.length === 0) return <div>Sem parciais para mostrar.</div>;

  return (
    <div className={styles.splitList}>
      {splits.map((split) => (
        <div key={split.split_id} className={styles.splitItem}>
          {split.distance}m: {split.swimtime}
        </div>
      ))}
    </div>
  );
}

