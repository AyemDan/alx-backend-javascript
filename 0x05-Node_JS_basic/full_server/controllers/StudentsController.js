const readDatabase = require('../utils'); // Adjust the path as needed

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const databasePath = process.argv[2] || request.query.database || 'database.csv';
      const data = await readDatabase(databasePath);

      const fields = {};

      data.forEach((student) => {
        const { firstname, field } = student;
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      let responseMessage = 'This is the list of our students\n';

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          const studentList = fields[field];
          responseMessage += `Number of students in ${field}: ${studentList.length}. List: ${studentList.join(', ')}\n`;
        }
      }

      response.status(200).send(responseMessage);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    try {
      const { major } = request.params;

      if (major !== 'CS' && major !== 'SWE') {
        return response.status(500).send('Major parameter must be CS or SWE');
      }
      const databasePath = process.argv[2] || request.query.database || 'database.csv';
      const data = await readDatabase(databasePath);

      const studentsInMajor = data.filter((student) => student.field === major);

      const firstNames = studentsInMajor.map((student) => student.firstname);

      if (firstNames.length === 0) {
        return response.status(200).send(`No students found in ${major}`);
      }

      const responseMessage = `List: ${firstNames.join(', ')}`;

      response.status(200).send(responseMessage);
    } catch (error) {
      console.log(error);
      response.status(500).send('Cannot load the database');
    }

    return null; // Explicit return to avoid linting error
  }
}

module.exports = StudentsController;
