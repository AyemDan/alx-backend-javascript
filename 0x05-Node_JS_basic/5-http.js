const http = require('http');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    // Attempt to read the file asynchronously
    const data = await fs.readFile(path, { encoding: 'utf8' });

    const rows = data.trim().split('\n').filter((row) => row.trim() !== '');

    if (rows.length === 0) {
      throw new Error('Cannot load the database');
    }

    const fields = rows[0].split(',').map((header) => header.trim());

    // Extract student data (remaining rows)
    const students = rows.slice(1).map((row) => row.split(',').map((cell) => cell.trim()));

    // Map students to objects
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

    let responseContent = `Number of students: ${numOfStudents}\n`;
    Object.entries(studentsByField).forEach(([field, names]) => {
      responseContent += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    });
    return responseContent;
  } catch (err) {
    // If there's an error, log it and reject the promise
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const dbFilePath = process.argv[2];

    if (!dbFilePath) {
      res.statusCode = 400;
      res.end('Database file path missing');
      return;
    }

    try {
      const students = await countStudents(dbFilePath);

      if (students) {
        res.end(`This is the list of our students\n${students}`);
      } else {
        res.statusCode = 500;
        res.end('Cannot load the student data properly');
      }
    } catch (err) {
      res.statusCode = 500;
      res.end('Cannot load the database');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
