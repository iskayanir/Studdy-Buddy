// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get } from "firebase/database";

// const response  = require("express");

// const firebaseConfig = {
//     apiKey: "your-api-key",
//     authDomain: "your-auth-domain",
//     databaseURL: "your-database-url",
//     projectId: "your-project-id",
//     storageBucket: "your-storage-bucket",
//     messagingSenderId: "your-messaging-sender-id",
//     appId: "your-app-id",
//     measurementId: "your-measurement-id",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// function displayData() {
//     const dbRef = ref(database);

//     // Fetching the students receiving help
//     get(child(dbRef, 'studentsReceivingHelp')).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const container = document.getElementById('studentsReceivingHelp');
//             container.innerHTML = ""; // Clear existing content
//             Object.values(data).forEach(student => {
//                 container.innerHTML += `<p>Name: ${student.name} - Year: ${student.year}</p>`;
//             });
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });

//     // Fetching the students providing help
//     get(child(dbRef, 'studentsProvidingHelp')).then((snapshot) => {
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             const container = document.getElementById('studentsProvidingHelp');
//             container.innerHTML = ""; // Clear existing content
//             Object.values(data).forEach(student => {
//                 container.innerHTML += `<p>Name: ${student.name} - Year: ${student.year}</p>`;
//             });
//         } else {
//             console.log("No data available");
//         }
//     }).catch((error) => {
//         console.error(error);
//     });
// }

// // Call the function to display data on load
// document.addEventListener('DOMContentLoaded', displayData);


// function fetchData() {
//   console.log("hello before")
//   fetch('http://localhost:3000/getStudents')
//   .then(response => {
//       console.log(response.json())
//       response.json()})
//   .then(data => {
//       const receivingHelpDiv = document.getElementById('studentsReceivingHelp');
//       data.forEach(student => {
//           receivingHelpDiv.innerHTML += <p>Name: ${student.name}, Year: ${student.year}</p>;
//       });
//   })
//   .catch(error => console.error('Error fetching data:', error));
//   return(response)

// }

// function fetchData() {
//     console.log("hello before");
//     fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/.json')
//       .then(response => response.json())
//       console.log(response)
//       .then(data => {
//         const receivingHelpDiv = document.getElementById('studentsReceivingHelp');
//         receivingHelpDiv.innerHTML = ''; // ריקון התוכן הקודם
//         data.forEach(student => {
//           receivingHelpDiv.innerHTML += `<p>Name: ${student.name}, Year: ${student.year}</p>`;
//         });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }
  
//   function fetchData() {
//     console.log("hello before");
//     fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/.json')
//       .then(response => {
//           console.log(response);
//           return response.json();
//       })
//       .then(data => {
//         const receivingHelpDiv = document.getElementById('studentsReceivingHelp');
//         receivingHelpDiv.innerHTML = ''; // ריקון התוכן הקודם
//         data.forEach(student => {
//           receivingHelpDiv.innerHTML += `<p>Name: ${student.name}, Year: ${student.year}</p>`;
//         });
//       })
//       .catch(error => console.error('Error fetching data:', error));
// }

function fetchData() {
    console.log("hello before");
    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/.json')
      .then(response => response.json())
      .then(data => {
        const receivingHelpDiv = document.getElementById('studentsReceivingHelp');
        receivingHelpDiv.innerHTML = ''; // ריקון התוכן הקודם

        if (data.studentsReceivingHelp) {
          Object.keys(data.studentsReceivingHelp).forEach(key => {
            const student = data.studentsReceivingHelp[key];
            receivingHelpDiv.innerHTML += `<p>Name: ${student.name}, Year: ${student.year}</p>`;
          });
        } else {
          console.error('No students receiving help found');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
}

function updateStudent() {
    const studentId = document.getElementById('updateStudentId').value;
    const name = document.getElementById('updateStudentName').value;
    const year = document.getElementById('updateStudentYear').value;

    const updatedStudent = {
        name: name,
        year: parseInt(year)
    };

    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/studentsReceivingHelp/${studentId}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchData(); // Refresh the data
    })
    .catch(error => {
        console.error('Error updating student:', error);
    });
}

function addStudent() {
    const name = document.getElementById('studentName').value;
    const year = document.getElementById('studentYear').value;

    const newStudent = {
        name: name,
        year: parseInt(year)
    };

    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/studentsReceivingHelp.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchData(); // Refresh the data
    })
    .catch(error => {
        console.error('Error adding student:', error);
    });
}