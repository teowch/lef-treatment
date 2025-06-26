import React from 'react';
import styles from './FullPageLoader.module.scss';

export default function FullPageLoader() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loader} />
    </div>
  );
}
