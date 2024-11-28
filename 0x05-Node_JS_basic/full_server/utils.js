// full_server/utils.js
const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    // Split the data into lines
    const lines = data.trim().split('\n');

    // Parse the header and rows
    const [header, ...rows] = lines;
    const headers = header.split(',').map((h) => h.trim());
    const row = rows.map((row) => row.split(',').map((r) => r.trim()));

    const dictionary = row.map((r) => r.reduce((acc, value, index) => {
      const newObj = { ...acc }; // Create a new object to avoid direct mutation
      newObj[headers[index]] = value;
      return newObj;
    }, {}));

    return dictionary;
  } catch (err) {
    throw new Error('Invalid');
  }
}

module.exports = readDatabase;
