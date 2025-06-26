import React, { useState } from 'react';
import SplitList from '../SplitList/SplitList';
import styles from './ResultItem.module.scss';
import Expandable from '../Expandable/Expandable';

const ResultItem = ({ result }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.resultItem}>
        <div className={styles.resultHeader} onClick={() => setExpanded(!expanded)}>
            <div style={{fontWeight: 'bold'}}>Raia {result.lane} - {result.swimtime}</div>
            {result.first_name} {result.last_name}
            <div style={{fontStyle: 'italic'}}>{result.club_shortname}</div>
        </div>

        <Expandable isOpen={expanded}>
          <SplitList resultid={result.resultid} />
        </Expandable>
    </div>
  );

};

export default ResultItem;
