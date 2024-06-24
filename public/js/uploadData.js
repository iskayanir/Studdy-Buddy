// uploadData.js

const { database } = require('../../server.js');
const { ref, set } = require('firebase/database');
const fs = require('fs');

// Read the JSON file
const studentData = JSON.parse(fs.readFileSync('students.json', 'utf8'));

// Upload the data to Firebase
set(ref(database, 'students'), studentData.students)
  .then(() => {
    console.log('Data uploaded successfully!');
  })
  .catch((error) => {
    console.error('Error uploading data:', error);
  });
