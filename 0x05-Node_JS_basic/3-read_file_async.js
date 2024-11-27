const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Attempt to read the file asynchronously
    const data = await fs.readFile(path, { encoding: 'utf8' });

    // Trim the data and split into rows
    const rows = data.trim().split('\n').filter((row) => row.trim() !== '');

    // If there are no rows, throw an error
    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }

    // Extract the field headers (first row)
    const fields = rows[0].split(',').map((header) => header.trim());

    // Extract student data (remaining rows)
    const students = rows.slice(1).map((row) => row.split(',').map((cell) => cell.trim()));

    // Map students to objects
    const studentObj = students.map((student) => fields.reduce((newObj, key, index) => (
      { ...newObj, [key]: student[index] }), {}));

    // Count the total number of students
    const numOfStudents = studentObj.length;

    // Group students by field (SWE, CS, etc.)
    const studentsByField = studentObj.reduce((acc, student) => {
      const { field, firstname } = student;
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(firstname);
      return acc;
    }, {});

    // Log the total number of students and details by field
    console.log(`Number of students: ${numOfStudents}`);
    Object.entries(studentsByField).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
    
    return Promise.resolve(); // Resolve the promise on success
  } catch (err) {
    // If there's an error, log it and reject the promise
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
