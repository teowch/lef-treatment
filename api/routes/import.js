const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { importLenexToDatabase } = require('../services/importService');

const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const summary = await importLenexToDatabase(filePath);
    res.status(200).json({ message: 'Importado com sucesso', resumo: summary });
  } catch (error) {
    res.status(500).json({ error: 'Falha ao importar arquivo LENEX.' });
  }
});

module.exports = router;
