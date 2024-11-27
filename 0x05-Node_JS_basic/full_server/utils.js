// full_server/utils.js
const fs = require('fs').promises;

async function readDatabase(filePath) {
    try {
        // Read the file asynchronously
        const data = await fs.readFile(filePath, 'utf8');
        
        // Split the data into lines
        const lines = data.trim().split('\n');
        
        // Parse the header and rows
        const [header, ...rows] = lines;
        const headers = header.split(',');
        
        // Find the index of 'firstname' and 'field'
        const firstNameIndex = headers.indexOf('firstname');
        const fieldIndex = headers.indexOf('field');
        
        if (firstNameIndex === -1 || fieldIndex === -1) {
            throw new Error("File does not have the required columns 'firstname' or 'field'");
        }

        // Group students by fields
        const fieldGroups = {};
        rows.forEach((row) => {
            const columns = row.split(',');
            const firstName = columns[firstNameIndex];
            const field = columns[fieldIndex];
            
            if (!fieldGroups[field]) {
                fieldGroups[field] = [];
            }
            
            fieldGroups[field].push(firstName);
        });

        return fieldGroups;
    } catch (err) {
        // Reject the promise with the error
        throw err;
    }
}

module.exports = readDatabase;
