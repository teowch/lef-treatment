import React from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import styles from './FileUpload.module.scss';

function FileUpload() {
  const {
    file,
    status,
    loading,
    handleChange,
    uploadFile,
  } = useFileUpload();

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="file" onChange={handleChange} accept=".lef,.lenex,.xml" />
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? <FullPageLoader /> : 'Enviar'}
      </button>
      {status && (
        <p>{status.message}</p>
      )}
    </form>
  );
}

export default FileUpload;
