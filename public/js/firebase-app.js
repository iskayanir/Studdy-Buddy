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
    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student.json')
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

    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp/${studentId}.json`, {
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

    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp.json', {
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


function addNewStudent() {
    const name = document.getElementById('studentName').value;
    const year = document.getElementById('studentYear').value;

    const newStudent = {
        name: name,
        year: parseInt(year)
    };

    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp.json', {
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



async function loadUserData(studentId) {
    const response = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp/${studentId}.json`);
    //https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/studentsReceivingHelp/${studentId}.json
    const userData = await response.json();
    if (userData) {
        if (userData.name) {
            document.getElementById('name').value = userData.name;
        }
        if (userData.email) {
            document.getElementById('email').value = userData.email;
        }
    }
}

// window.onload = function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('userId');
//     const type = urlParams.get('type') || 'studentsReceivingHelp';
//     console.log("enter")
//     if (userId) {
//         loadUserData(userId);
//     }
// }


// async function handleCredentialResponse(response) {
//     const data = jwt_decode(response.credential);
//     console.log(data);
//     alert('Logged in as ' + data.name);

//     // בדיקה אם המשתמש קיים בשרת
//     const studentId = data.email;
//     const { exists, } = await fetch(`https://study-userIdbuddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/studentsReceivingHelp/${studentId}.json`)
//         .then(response => response.json());

//     if (exists) {
//       console.log("exist")
//         // המשתמש קיים, נשלח לעמוד הפרופיל שלו
//         window.location.href = `buyer_profile.html?userId=${studentId}&type=${type}`;
//     } else {
//       console.log("not exist")
//         // המשתמש לא קיים, נשמור אותו ונשלח לעמוד ה-setup
//         const type = 'studentsReceivingHelp'; // או 'studentsProvidingHelp' בהתאם לצורך
//         await fetch('/saveUser', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 studentId: studentId,
//                 name: data.name,
//                 email: data.email,
//                 type: type
//             })
//         });
//         window.location.href = `buyer_setup_profile.html?userId=${studentId}`;
//     }
// }
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    console.log(data);
    alert('Logged in as ' + data.name);
    // checkStudent('student_1');
    // id_student = searchEmail("adam@example.com")
    // console.log(id_student);
    searchEmail("adam@example.com").then(result => {
        if (result) {
            console.log(`Student ID: ${result.studentId}, Type: ${result.type}`);
            if (result.type=="providingHelp"){
                window.location.href = 'seller_profile.html'
            }
            else {
                window.location.href = 'buyer_profile.html'
            }
            
        } else {
            console.log('Email not found.');
            window.location.href = 'buyer_setup_profile.html'
        }
    });
    // window.location.href = 'buyer_setup_profile.html';
}


  function initGoogleSignIn() {
      google.accounts.id.initialize({
          client_id: '254149753908-es200ngb1pk62tf2pikbufl0kkckeaeb.apps.googleusercontent.com',
          callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large" }
      );
  }


//   function checkStudentExists(studentId) {
//     const studentRef = firebase.database().ref(`student/studentsReceivingHelp/${studentId}`);
  
//     studentRef.once('value', (snapshot) => {
//       if (snapshot.exists()) {
//         console.log(`${studentId} is present in the database.`);
//       } else {
//         console.log(`${studentId} is not found in the database.`);
//       }
//     }).catch((error) => {
//       console.error("Error reading data: ", error);
//     });
//   }

  async function checkStudent(studentId) {
    console.log(studentId);
    const response = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp/${studentId}.json`);
    const result = await response.json();
    if (result !== null) {
        alert(`Student ${studentId} exists: ${JSON.stringify(result)}`);
      } else {
        alert(`Student ${studentId} does not exist.`);
      }
    }
  


// async function searchEmail(email) {
//     console.log(email);
//     const response = await fetch(`/searchEmail/${email}`);
//     if (!response.ok) {
//         console.log(response);
//         console.error('Failed to fetch');
//         return;
//     }
//     const result = await response.json();
//     if (result.exists) {
//         alert(`Email ${email} exists: ${JSON.stringify(result.data)}`);
//     } else {
//         alert(`Email ${email} does not exist.`);
//     }
// }


// function searchEmail(email) {
//     console.log(email);
//     fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student.json')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
    //   .then(data => {
    //     const receivingHelpDiv = document.getElementById('studentsReceivingHelp');
    //     receivingHelpDiv.innerHTML = ''; // ריקון התוכן הקודם

    //     if (data.studentsReceivingHelp) {
    //       Object.keys(data.studentsReceivingHelp).forEach(key => {
    //         const student = data.studentsReceivingHelp[key];
    //         receivingHelpDiv.innerHTML += `<p>Name: ${student.name}, Year: ${student.year}</p>`;
    //       });
    //     } else {
    //       console.error('No students receiving help found');
    //     }
    //   })
    //   .catch(error => console.error('Error fetching data:', error));
// }

function searchEmail(email) {
    console.log(email);
    return fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student.json')
        .then(response => response.json())
        .then(data => {
            let result = null;

            // בדיקה בתוך סטודנטים המקבלים עזרה
            if (data.studentsReceivingHelp) {
                for (let key in data.studentsReceivingHelp) {
                    const student = data.studentsReceivingHelp[key];
                    if (student.contact && student.contact.email === email) {
                        result = { studentId: key, type: 'receivingHelp' };
                        console.log(`Email found in students receiving help: ${student.name}, ${student.contact.email}`);
                        return result; // החזרה מיידית כשנמצא
                    }
                }
            }

            // בדיקה בתוך סטודנטים המעניקים עזרה
            if (!result && data.studentsProvidingHelp) {
                for (let key in data.studentsProvidingHelp) {
                    const student = data.studentsProvidingHelp[key];
                    if (student.contact && student.contact.email === email) {
                        result = { studentId: key, type: 'providingHelp' };
                        console.log(`Email found in students providing help: ${student.name}, ${student.contact.email}`);
                        return result; // החזרה מיידית כשנמצא
                    }
                }
            }

            if (!result) {
                console.log('Email not found in any students');
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}
