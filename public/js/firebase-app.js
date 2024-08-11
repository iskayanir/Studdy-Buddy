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




window.GlobStudentID = ''; // משתנה גלובלי
window.GlobalStudentMail= ''; // משתנה גלובלי

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

     // שמירת הנתונים ב-Local Storage
     const userData = {
        name: data.name,
        email: data.email,
        imageUrl: data.picture
    };
    console.log(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    GlobalStudentMail = userData.email;
    console.log(GlobalStudentMail + "מייל גלובלי")


    searchEmail(data.email).then(result => {
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


  export function initGoogleSignIn() {
      google.accounts.id.initialize({
          client_id: '254149753908-es200ngb1pk62tf2pikbufl0kkckeaeb.apps.googleusercontent.com',
          callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
          document.getElementById("g_id_signin"),
          { theme: "outline", size: "large" }
      );
  }

// הפיכת הפונקציה לזמינה בגלובלי
if (typeof window !== 'undefined') {
    window.initGoogleSignIn = initGoogleSignIn;
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
                    // if (student.contact && student.contact.email === email) {
                    if (student.mail === email) {
                        result = { studentId: key, type: 'receivingHelp' };
                        console.log(`Email found in students receiving help: ${student.name}, ${student.mail}`);
                        return result; // החזרה מיידית כשנמצא
                    }
                }
            }

            // בדיקה בתוך סטודנטים המעניקים עזרה
            if (!result && data.studentsProvidingHelp) {
                for (let key in data.studentsProvidingHelp) {
                    const student = data.studentsProvidingHelp[key];
                    if (student.mail === email) {
                        result = { studentId: key, type: 'providingHelp' };
                        console.log(`Email found in students providing help: ${student.name}, ${student.mail}`);
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


export function getStudent() {
    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student.json')
      .then(response => response.json())
      .then(data => {
        return data;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null;
        });
}

// פונקציה שממלאת את הטופס עם נתוני המשתמש
function fillUserProfile(userData) {
    if (userData) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('degree').value = userData.degree || '';
        document.getElementById('year').value = userData.year || 'א';
        document.getElementById('number').value = userData.number || '';
        document.getElementById('email').value = userData.email || '';
    }
}

// window.onload = function() {
//     const userId = 'user123'; // הכנס כאן את ה-ID של המשתמש
//     getStudent(userId).then(userData => {
//         fillUserProfile(userData);
//     });
// };

export function saveProfileDataToFirebase(type) {
    const name = document.getElementById('name').value;
    const degree = document.getElementById('degree').value;
    const year = document.getElementById('year').value;
    const mail = document.getElementById('email').value;
    const tel = document.getElementById('number').value;

    let newStudent = {
        name: name,
        degree: degree,
        mail: mail,
        tel: tel,
        year: year
    };

    // First, check if the email already exists
    searchEmail(mail).then(existingUser => {
        console.log("enter");
        if (existingUser) {
            alert('משתמש עם מייל זה כבר רשום.');
            console.log('User already exists:', existingUser);
        } else {
            console.log("המשתמש לא רשום")
            // If the email does not exist, proceed with saving the data
            fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.name + "גלובלי");
                GlobStudentID = data.name;
                localStorage.setItem('GlobalStudentID', data.name);
                console.log('Student ID saved to localStorage:', localStorage.getItem('GlobalStudentID'));
                console.log('Student saved successfully:', data);
                // fetchData(); // Optionally refresh the data
            })
            .catch(error => {
                console.error('Error saving student:', error);
            });
        }
    }).catch(error => {
        console.error('Error checking email:', error);
    });
}

window.saveProfileDataToFirebase = saveProfileDataToFirebase;


export function loadProfileData(type) {
    // שליפת האובייקט שנשמר ב-Local Storage
    var storedUserData = localStorage.getItem('userData');

    // בדיקה אם הנתון קיים
    if (storedUserData) {
        // המרת האובייקט משיטת JSON לאובייקט רגיל
        var userData = JSON.parse(storedUserData);

        // שליפת המייל מתוך האובייקט
        var email = userData.email;
        console.log('The email stored in LocalStorage is:', email);

        // חיפוש הסטודנט לפי המייל
        getStudentIdByEmail(email, type).then(result => {
            if (result) {
                console.log('User ID found:', result);
                var studentId = result;

                // ביצוע פניה ל-Firebase לאחר קבלת ה-ID
                fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            // הצגת המידע בטפסים השונים
                            document.getElementById('displayName').textContent = data.name || '';
                            document.getElementById('displayDegree').textContent = data.degree || '';
                            document.getElementById('displayYear').textContent = data.year || '';
                            document.getElementById('displayPhoneNumber').textContent = data.tel || '';
                            document.getElementById('displayEmail').textContent = data.mail || '';

                            // עדכון תמונת הפרופיל במידה וקיימת
                            if (data.imageUrl) {
                                document.getElementById('profilePicture').src = data.imageUrl;
                            }
                        } else {
                            console.error('User data not found');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('User not found with the given email.');
            }
        }).catch(error => {
            console.error('Error fetching student ID:', error);
        });
    } else {
        console.log('No user data found in LocalStorage.');
    }
}

window.loadProfileData = loadProfileData;


export function getStudentIdByEmail(email, type) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`)
        .then(response => response.json())
        .then(data => {
            for (let key in data) {
                let student = data[key];
                if (student.mail === email) {
                    return key; // מחזיר את ה-ID של הסטודנט
                }
            }
            return null; // מחזיר null אם המייל לא נמצא
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}
