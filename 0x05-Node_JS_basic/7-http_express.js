const express = require('express');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });

    const rows = data.trim().split('\n').filter((row) => row.trim() !== ''); // Remove empty lines

    if (rows.length === 0) {
      throw new Error('Cannot load the database');
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

    let result = `Number of students: ${numOfStudents}\n`;
    Object.entries(studentsByField).forEach(([field, names]) => {
      result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });

    return result;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const app = express();

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const dbFilePath = process.argv[2];

  if (!dbFilePath) {
    return res.status(400).send('Database file path missing');
  }

  try {
    const studentData = await countStudents(dbFilePath);
    res.type('text/plain');
    res.send(`This is the list of our students\n${studentData}`);
  } catch (err) {
    res.status(500).send('Cannot load the database');
  }
  return res.status(200);
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
