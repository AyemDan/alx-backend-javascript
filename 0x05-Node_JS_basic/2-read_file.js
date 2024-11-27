const fs = require('fs');

function countStudents(path) {
  try {
    if (!path || !fs.existsSync(path)) {
      throw new Error('Cannot load the database');
    }

    const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }).trim();
    const rows = data.split('\n').filter((row) => row.trim() !== '');

    if (rows.length === 0) {
      throw new Error('File is invalid');
    }

    const fields = rows[0].split(',').map((header) => header.trim());

    const students = rows.slice(1).map((row) => row.split(',').map((cell) => cell.trim()));

    const studentObj = students.map((student) => fields.reduce((newObj, key, index) => (
      { ...newObj, [key]: student[index] }), {}));

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
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
