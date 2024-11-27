const { readDatabase } = require('../utils');

class StudentsController {
    static async getAllStudents(req, res) {
        try {
            // Read the database using the readDatabase function
            const data = await readDatabase('path/to/database/file');  // Provide the correct path to your database file
            
            // Prepare the list of students per field
            const fields = {};

            // Process each student and their field
            data.forEach(student => {
                const { firstname, field } = student;
                if (!fields[field]) {
                    fields[field] = [];
                }
                fields[field].push(firstname);
            });

            // Sort fields alphabetically (case-insensitive)
            const sortedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

            // Start the response
            let responseMessage = "This is the list of our students\n";

            // Add the number of students and their names per field
            sortedFields.forEach(field => {
                const students = fields[field];
                responseMessage += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
            });

            // Send the response with status 200
            res.status(200).send(responseMessage);

        } catch (error) {
            // If the database cannot be loaded, return a 500 status with an error message
            res.status(500).send('Cannot load the database');
        }
    }
    
    static async getAllStudentsByMajor(req, res) {
        try {
            // Retrieve the major from the query parameter
            const major = req.query.major;

            // Check if the major is either 'CS' or 'SWE'
            if (major !== 'CS' && major !== 'SWE') {
                return res.status(500).send('Major parameter must be CS or SWE');
            }

            // Read the database using the readDatabase function
            const data = await readDatabase('path/to/database/file');  // Provide the correct path to your database file

            // Filter students by the specified major
            const studentsInMajor = data.filter(student => student.field === major);

            // Get the list of first names
            const firstNames = studentsInMajor.map(student => student.firstname);

            // If no students are found in the major, return an appropriate message
            if (firstNames.length === 0) {
                return res.status(200).send(`No students found in ${major}`);
            }

            // Construct the response message
            const responseMessage = `List: ${firstNames.join(', ')}`;

            // Send the response with status 200
            res.status(200).send(responseMessage);

        } catch (error) {
            // If the database cannot be loaded, return a 500 status with an error message
            res.status(500).send('Cannot load the database');
        }
    }
}

module.exports = StudentsController;
