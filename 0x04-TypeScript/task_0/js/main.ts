// 1. Define the Student interface
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  }
  
  // 2. Create two students
  const student1: Student = {
    firstName: 'John',
    lastName: 'Doe',
    age: 22,
    location: 'San Francisco'
  };
  
  const student2: Student = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 24,
    location: 'New York'
  };
  
  // 3. Create an array of students
  const studentsList: Student[] = [student1, student2];
  
  // 4. Render a table using Vanilla JavaScript
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  
  studentsList.forEach((student) => {
    const row = document.createElement('tr');
    
    // Create a cell for firstName
    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;
    
    // Create a cell for location
    const locationCell = document.createElement('td');
    locationCell.textContent = student.location;
    
    // Append cells to the row
    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    
    // Append row to the tbody
    tbody.appendChild(row);
  });
  
  // Append tbody to the table
  table.appendChild(tbody);
  
  // Append table to the document body (or any other container)
  document.body.appendChild(table);
  