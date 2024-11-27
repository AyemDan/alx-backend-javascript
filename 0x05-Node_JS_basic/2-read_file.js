const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }).trim();
    const rows = data.split('\n').filter((row) => row.trim() !== '');

    if (rows.length < 2) { // Ensure there's at least a header and one data row
      throw new Error('Cannot load the database');
    }

    const fields = rows[0].split(',');
    const students = rows.slice(1).map((row) => row.split(','));

    const studentObj = students.map((student) => fields.reduce(
      (newObj, key, index) => ({ ...newObj, [key]: student[index] }),
      {},
    ));

    const numOfStudents = studentObj.length;
    const studentsByField = studentObj.reduce((acc, student) => {
      const { field, firstname } = student;
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(firstname);
      return acc;
    }, {});

    console.log(`Number of students: ${numOfStudents}`);
    Object.entries(studentsByField).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    console.error('Cannot load the database');
  }
}

module.exports = countStudents;
