export default function updateStudentGradeByCity(students, city, newGrades) {
  if (!Array.isArray(students) || typeof city !== 'string') {
    return [];
  }

  return students
    .filter((student) => student.location === city)
    .map((student) => {
      // Check for matching grades using filter
      const matchingGrades = newGrades.filter((gradeObj) => gradeObj.studentId === student.id);

      // Create a new student object explicitly
      const updatedStudent = {
        id: student.id,
        firstName: student.firstName,
        location: student.location,
        grade: matchingGrades.length > 0 ? matchingGrades[0].grade : 'N/A',
      };

      return updatedStudent; // Return the new student object
    });
}
