const fs = require('fs');
const { parseLenexFile } = require('./lenexService');
const { insertIntoDatabase } = require('./insertIntoDatabase');

async function importLenexToDatabase(filePath) {
  try {
    const parsedData = await parseLenexFile(filePath);
    const importSummary = await insertIntoDatabase(parsedData);
    return importSummary;
  } catch (err) {
    console.error('Erro ao importar LENEX:', err);
    throw err;
  } finally {
    if (fs.existsSync(filePath))
      fs.unlinkSync(filePath);
  }
}

module.exports = {
  importLenexToDatabase,
};
