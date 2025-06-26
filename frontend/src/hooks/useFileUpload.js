import { useState } from 'react';
import axios from 'axios';
import api from '../services/api';

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const uploadFile = async () => {
    if (!file) {
      setStatus('Selecione um arquivo primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setStatus('Enviando...');
      const res = await api.post('/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus(res.data);
    } catch (error) {
      console.error(error);
      setStatus('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    status,
    loading,
    handleChange,
    uploadFile,
  };
}
