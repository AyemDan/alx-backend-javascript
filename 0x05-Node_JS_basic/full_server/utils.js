const fs = require('fs').promises;

async function readDatabase(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        
        // Split the data into lines
        const lines = data.trim().split('\n');
        
        // Parse the header and rows
        const [header, ...rows] = lines;
        const headers = header.split(',').map(h => h.trim());
        const row = rows.map(row => row.split(',').map(r => r.trim()));

        
        const dictionary = row.map(r => {
            return r.reduce((obj, value, index) => {
              obj[headers[index]] = value; 
              return obj;
            }, {});
          });
          
        return dictionary
    } catch (err) {
        // Reject the promise with the error
        throw err;
    }
}

module.exports = readDatabase;