import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSelectStudent = (event) => {
    setSelectedStudent(event.target.value);
  };

  const studentdata = students.find(student => student.name === selectedStudent)

  return (
    <div className="App">
      <h1>Student Details</h1>
      <select value={selectedStudent} onChange={handleSelectStudent}>
        <option value="">Select a student</option>
        {students.map(student => (
          <option key={student.id} value={student.name}>
            {student.name} 
          </option>
        ))}
      </select>
      {studentdata && (
        <div>
          <h2>Selected Student: {selectedStudent}</h2>
          {
            <p>Marks: {studentdata.marks}</p>
          }
        </div>
      )}
    </div>
  );
}

export default App;
