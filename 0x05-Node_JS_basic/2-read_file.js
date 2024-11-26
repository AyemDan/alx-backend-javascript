const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    console.log(data);
    const rows = data.split('\n').filter(row => row.trim() !== ''); // Remove empty lines

    // If there are no valid rows, throw an error
    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }
    const fields = rows[0].split(',');

    // Create an array to hold the students' data
    const students = rows.slice(1).map(row => row.split(','));
    const fieldCounts = {};
    
    // Initialize arrays to store the first names of students per field
    fields.forEach(field => {
      fieldCounts[field] = { count: 0, names: [] };
    });

    console.log(fields);
    console.log(students);

    console.log(fieldCounts);

  } catch (err) {
    console.error('Cannot load the database');
  }
}
module.exports = countStudents;
