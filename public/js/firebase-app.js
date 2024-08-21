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




// window.GlobStudentID = ''; // משתנה גלובלי
// window.GlobalStudentMail= ''; // משתנה גלובלי

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
    // GlobalStudentMail = userData.email;
    // console.log(GlobalStudentMail + "מייל גלובלי")


    searchEmail(data.email).then(result => {
        if (result) {
            console.log(`Student ID: ${result.studentId}, Type: ${result.type}`);
            localStorage.setItem('GlobalStudentID', result.studentId);
            localStorage.setItem('userType', result.type);
            console.log("ה-ID הוא ", result.studentId)
            console.log("סוג סטודנט", result.type)
            if (result.type=="providingHelp"){
                window.location.href = 'seller.html'
            }
            else {
                window.location.href = 'buyer.html'
            }
            
        } else {
            console.log('Email not found.');
            window.location.href = 'setup_profile.html'
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
                        result = { studentId: key, type: 'studentsReceivingHelp' };
                        console.log(`Email found in students receiving help: ${student.name}, ${student.mail}`, result.type);
                        return result; // החזרה מיידית כשנמצא
                    }
                }
            }

            // בדיקה בתוך סטודנטים המעניקים עזרה
            if (!result && data.studentsProvidingHelp) {
                for (let key in data.studentsProvidingHelp) {
                    const student = data.studentsProvidingHelp[key];
                    if (student.mail === email) {
                        result = { studentId: key, type: 'studentsProvidingHelp' };
                        console.log(`Email found in students providing help: ${student.name}, ${student.mail}`, result.type);
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


export function saveProfileDataToFirebase() {
    // הגדרת המשתנה def_Ty כערך של ה-defaultType מה-localStorage
    const def_Ty = localStorage.getItem('defaultType') || 'studentsReceivingHelp';
    
    console.log(def_Ty + " דיפולט");
    
    // שימוש במשתנה type שמבוסס על הבחירה של המשתמש או הדיפולט
    const type = localStorage.getItem('userType') || def_Ty;
    localStorage.setItem('userType', type);
    localStorage.setItem('GlobalStudentID', '');
    console.log(type + " סוג בחירה");
    
    localStorage.setItem('GlobalStudentID', '');
    console.log("once");
    
    const name = document.getElementById('name').value;
    const degree = document.getElementById('degree').value;
    const year = document.getElementById('year').value;
    const mail = document.getElementById('email').value;
    const tel = document.getElementById('number').value;

    // בדיקת קיום המשתמש לפי האימייל
    searchEmail(mail).then(existingUser => {
        console.log("enter");
        if (existingUser) {
            alert('משתמש עם מייל זה כבר רשום.');
            console.log('User already exists:', existingUser);
            console.log('User type:', existingUser.type);
        
            if (existingUser.type == "studentsReceivingHelp") {
                window.location.href = 'buyer.html';
            } else {
                window.location.href = 'seller.html';
            }
        } else {
            console.log("המשתמש לא רשום");
            let newStudent = {
                name: name,
                degree: degree,
                mail: mail,
                tel: tel,
                year: year
            };

            // שמירת נתונים ב-Firebase
            fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStudent)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.name + " גלובלי");
                localStorage.setItem('GlobalStudentID', data.name);
                // מעבר לעמוד הבא
                window.location.href = 'search_setup.html';
            })
            .catch(error => {
                console.error('Error saving student:', error);
            });
        }
    }).catch(error => {
        console.error('Error checking email:', error);
    });
}



// export function saveProfileDataToFirebase() {
//     localStorage.setItem('defaultType', 'studentsReceivingHelp');
//     def_Ty = localStorage.getItem('defaultType')
//     console.log( def_Ty + "sדיפולט");
//     const type = localStorage.getItem('userType') || def_Ty;
//     console.log(type +"סוג בחירהדד");
//     localStorage.setItem('GlobalStudentID', '');
//     console.log("once");
//     const name = document.getElementById('name').value;
//     const degree = document.getElementById('degree').value;
//     const year = document.getElementById('year').value;
//     const mail = document.getElementById('email').value;
//     const tel = document.getElementById('number').value;
    
//     // First, check if the email already exists
//     // צריך לחשוב האם אפשר לפתוח חשבון גם וגם
//     searchEmail(mail).then(existingUser => {
//         console.log("enter");
//         if (existingUser) {
//             alert('משתמש עם מייל זה כבר רשום.');
//             console.log('User already exists:', existingUser);
//             console.log('User type:', existingUser.type);
        
//             if (existingUser.type == "studentsReceivingHelp") {
//                 window.location.href = 'buyer.html';
//             } else {
//                 window.location.href = 'seller.html';
//             }
//         } else {
//             console.log("המשתמש לא רשום");
//             let newStudent = {
//                 name: name,
//                 degree: degree,
//                 mail: mail,
//                 tel: tel,
//                 year: year
//             };
//             // If the email does not exist, proceed with saving the data
//             fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(newStudent)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data.name + "גלובלי");
//                 localStorage.setItem('GlobalStudentID', data.name);
//                 // לאחר השמירה בהצלחה, בצע את המעבר לדף
//                 window.location.href = 'buyer_setup_search.html';
//             })
//             .catch(error => {
//                 console.error('Error saving student:', error);
//             });
//         }
//     }).catch(error => {
//         console.error('Error checking email:', error);
//     });
// }


window.saveProfileDataToFirebase = saveProfileDataToFirebase;


export function loadProfileData() {
    console.log("נכנס")
    // שליפת האובייקט שנשמר ב-Local Storage
    var type = localStorage.getItem('userType');
    console.log(type)
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
                            document.getElementById('displayHobbies').textContent = data.hobbies || '';
                            document.getElementById('displayAboutMe').textContent = data.aboutme || '';

                            // עדכון תמונת הפרופיל במידה וקיימת
                            if (data.imageUrl) {
                                document.getElementById('profilePicture').src = data.imageUrl;
                            }
                             // קריאה לפונקציה לטעינת הקורסים
                             loadCourses(studentId, type);
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

// function loadCourses(studentId, type) {
//     const courseList = document.getElementById('courseList');

//     // נוודא שה-courseList ריק לפני שמכניסים את הקורסים
//     courseList.innerHTML = '';

//     // נשלוף את הקורסים מ-Firebase
//     fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`)
//         .then(response => response.json())
//         .then(courses => {
//             if (courses) {
//                 courses.forEach(course => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = course;
//                     courseList.appendChild(listItem);
//                 });
//             } else {
//                 courseList.innerHTML = '<li>לא נמצאו קורסים</li>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching courses:', error);
//             courseList.innerHTML = '<li>שגיאה בטעינת הקורסים</li>';
//         });
// }

function loadCourses(studentId, type) {
    const courseList = document.getElementById('courseList');

    // נוודא שה-courseList ריק לפני שמכניסים את הקורסים
    courseList.innerHTML = '';

    // נשלוף את הקורסים מ-Firebase
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`)
        .then(response => response.json())
        .then(courses => {
            if (courses) {
                // נעבור על מפתחות הקורסים ונוסיף כל אחד לרשימה
                Object.keys(courses).forEach(courseId => {
                    const listItem = document.createElement('li');
                    listItem.textContent = courseId;
                    courseList.appendChild(listItem);
                });
            } else {
                courseList.innerHTML = '<li>לא נמצאו קורסים</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            courseList.innerHTML = '<li>שגיאה בטעינת הקורסים</li>';
        });
}



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

// export function addCourse(courseId) {
//     var type = localStorage.getItem('userType');
//     console.log(type);
//     const StudentID = localStorage.getItem('GlobalStudentID');
//     console.log(courseId);
//     console.log(StudentID);
//     fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${StudentID}.json`)
//         .then(response => response.json())
//         .then(student => {
//             console.log('Fetched student data:', student);
//             if (!student) {
//                 console.error('Student not found');
//                 return;
//             }

//             student.courses = student.courses || [];
//             if (!student.courses.includes(courseId)) {
//                 student.courses.push(courseId);
//             }           

//             // Update the student data in Firebase
//             fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${StudentID}.json`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(student)
//             })
//             .then(response => response.json())
//             .then(updatedStudent => {
//                 updateStyleCoursetoSelected(courseId);
//                 console.log('Success:', updatedStudent);
//             })
//             .catch(error => {
//                 console.error('Error updating student:', error);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching student:', error);
//         });
// }

export function addCourse(courseId) {
    var type = localStorage.getItem('userType');
    console.log(type);
    const StudentID = localStorage.getItem('GlobalStudentID');
    console.log(courseId);
    console.log(StudentID);

    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${StudentID}.json`)
        .then(response => response.json())
        .then(student => {
            console.log('Fetched student data:', student);
            if (!student) {
                console.error('Student not found');
                return;
            }

            // ודא שהקורסים הם אובייקט או מערך והוסף את הקורס אם הוא לא קיים
            student.courses = student.courses || {};
            if (!student.courses.hasOwnProperty(courseId)) {
                student.courses[courseId] = true;  // שמור את הקורס לפי מה שנדרש
            }           

            // עדכון נתוני הסטודנט ב-Firebase
            return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${StudentID}.json`,
                 {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            });
        })
        .then(response => response.json())
        .then(updatedStudent => {
            updateStyleCoursetoSelected(courseId);
            console.log('Success:', updatedStudent);
        })
        .catch(error => {
            console.error('Error fetching or updating student:', error);
        });
}
window.addCourse = addCourse;



export function saveUserType(userType) {
    console.log("enter function")
    localStorage.setItem('userType', userType);
  }
  window.saveUserType = saveUserType;


 export function navigateToCourses() {
    // נשלוף את סוג הסטודנט מתוך localStorage
    const studentType = localStorage.getItem('userType');

    // בדיקה לאן להפנות את המשתמש בהתאם לסוגו
    if (studentType === 'studentsReceivingHelp') {
        window.location.href = 'buyer.html';
    } else if (studentType === 'studentsProvidingHelp') {
        window.location.href = 'seller.html'; 
    } else {
        alert('סוג המשתמש אינו מוגדר. אנא נסה שוב.');
    }
}

window.navigateToCourses = navigateToCourses;

function updateStyleCoursetoSelected(courseId) {
    // Fetch the course details from Firebase
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/courses/${courseId}.json`)
        .then(response => response.json())
        .then(course => {
            // Find the grid item element corresponding to the courseId
            const gridItem = document.querySelector(`[data-course-id='${courseId}']`);

            if (!gridItem) {
                console.error('Grid item not found for courseId:', courseId);
                return;
            }

            // Update the inner HTML of the grid item
            gridItem.innerHTML = `
                <h2 class="course-name">${course['Course Name']}</h2>
                <i class="bi bi-mortarboard icon"></i>
                <ul>
                    <li class="faculty">פקולטה: ${course.Faculty}</li>
                    <li class ="department"> חוג: ${course.Department}</li>
                    <li class="teacher">מרצה: ${course['Lacture Name']}</li>
                </ul>
                <button class="add" id="addd" onclick="removeCourse('${courseId}')">מחק קורס</button>
            `;

            // Change the background color of the grid item
            gridItem.style.backgroundColor = '#c2e0f0';
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
}


// export function removeCourse(courseId) {
//     const studentId = localStorage.getItem("GlobalStudentID");
//     const type = localStorage.getItem("userType");

//     return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`)
//         .then(response => response.json())
//         .then(courses => {
//             if (!courses) {
//                 throw new Error('Courses not found');
//             }

//             // Find the index of the courseId in the courses array
//             const courseIndex = courses.findIndex(course => course == courseId);
//             if (courseIndex === -1) {
//                 throw new Error('Course not found in student\'s courses');
//             }

//             // Remove the course from the array
//             courses.splice(courseIndex, 1);

//             // Update the student's courses in Firebase
//             return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(courses)
//             });
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to update courses');
//             }
//             return response.json();
//         })
//         .then(data => {
//             updateStyleCoursetoZamin(courseId)
//             console.log(`Course with ID ${courseId} removed successfully:`, data);
//         })
//         .catch(error => {
//             console.error('Error removing course:', error);
//         });
// }
export function removeCourse(courseId) {
    const studentId = localStorage.getItem("GlobalStudentID");
    const type = localStorage.getItem("userType");

    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`)
        .then(response => response.json())
        .then(courses => {
            if (!courses) {
                throw new Error('Courses not found');
            }

            // Check if the courseId exists in the courses object
            if (!courses[courseId]) {
                throw new Error('Course not found in student\'s courses');
            }

            // Remove the course by deleting the courseId key from the courses object
            delete courses[courseId];

            // Update the student's courses in Firebase
            return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}/courses.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courses)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update courses');
            }
            return response.json();
        })
        .then(data => {
            updateStyleCoursetoZamin(courseId);
            console.log(`Course with ID ${courseId} removed successfully:`, data);
        })
        .catch(error => {
            console.error('Error removing course:', error);
        });
}

window.removeCourse = removeCourse;


function updateStyleCoursetoZamin(courseId) {
    // Fetch the course details from Firebase
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/courses/${courseId}.json`)
        .then(response => response.json())
        .then(course => {
            // Find the grid item element corresponding to the courseId
            const gridItem = document.querySelector(`[data-course-id='${courseId}']`);

            if (!gridItem) {
                console.error('Grid item not found for courseId:', courseId);
                return;
            }

            // Update the inner HTML of the grid item
            gridItem.innerHTML = `
                <h2 class="course-name">${course['Course Name']}</h2>
                <i class="bi bi-mortarboard icon"></i>
                <ul>
                    <li class="faculty">פקולטה: ${course.Faculty}</li>
                    <li class ="department"> חוג: ${course.Department}</li>
                    <li class="teacher">מרצה: ${course['Lacture Name']}</li>
                </ul>
                <button class="add" id="addd" onclick="addCourse('${courseId}')">הוסף קורס</button>
            `;

            // Change the background color of the grid item
            gridItem.style.backgroundColor = '#ffffff'; // Change to a different color
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
}


