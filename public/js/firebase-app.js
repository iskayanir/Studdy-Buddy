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


    searchEmail(data.email).then(result => {
        if (result) {
            console.log(`Student ID: ${result.studentId}, Type: ${result.type}`);
            localStorage.setItem('GlobalStudentID', result.studentId);
            localStorage.setItem('userType', result.type);
            console.log("ה-ID הוא ", result.studentId)
            console.log("סוג סטודנט", result.type)
            if (result.type=="studentsProvidingHelp"){
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
    const userdata = JSON.parse(localStorage.getItem('userData'));
    const picture = userdata ? userdata.imageUrl : null;
    console.log(picture);

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
                year: year,
                image: picture
                
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

window.saveProfileDataToFirebase = saveProfileDataToFirebase;


export function loadProfileData() {
    console.log("נכנס");
    // שליפת האובייקט שנשמר ב-Local Storage
    const type = localStorage.getItem('userType');
    console.log(type);
    const storedUserData = localStorage.getItem('userData');

    // בדיקה אם הנתון קיים
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // שליפת המייל מתוך האובייקט
        const email = userData.email;
        console.log('The email stored in LocalStorage is:', email);

        // חיפוש הסטודנט לפי המייל
        getStudentIdByEmail(email, type).then(result => {
            if (result) {
                console.log('User ID found:', result);
                const studentId = result;

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

                            // עדכון ה-src של תמונת הפרופיל
                            const profilePictureElement = document.getElementById('profilePicture');
                            if (data.image) {
                                console.log('Firebase image URL:', data.image); // בדיקת ה-URL של התמונה
                                profilePictureElement.src = data.image; // עדכון src עם התמונה מ-Firebase
                            } else {
                                profilePictureElement.src = 'images/prof.jpeg'; // שימוש בתמונת ברירת מחדל
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
                <i class="bi bi-mortarboard icon"></i>    
                <h2 class="course-name">${course['Course Name']}</h2>
                <ul>
                    <li class="course-id">מספר קורס: ${courseId}</li>
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
                <i class="bi bi-mortarboard icon"></i>
                <h2 class="course-name">${course['Course Name']}</h2>
                <ul>
                    <li class="course-id">מספר קורס: ${courseId}</li>
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


export function editProfileData() {
    const type = localStorage.getItem('userType');
    const id = localStorage.getItem('GlobalStudentID');
    const currentImageSrc = document.getElementById('profilePicture').src;
    const userdata = JSON.parse(localStorage.getItem('userData'));
    // שימוש בתמונה המוצגת כרגע, אלא אם כן מדובר בתמונת ברירת מחדל
    const picture = currentImageSrc !== 'images/prof.jpeg' ? currentImageSrc : userdata.imageUrl;

    const name = document.getElementById('name').value || '';
    const degree = document.getElementById('degree').value || '';
    const year = document.getElementById('year').value || '';
    const mail = document.getElementById('email').value || '';
    const tel = document.getElementById('number').value || '';
    const aboutme = document.getElementById('aboutme').value || '';
    const hobbies = document.getElementById('hobbies').value || '';

    // יצירת אובייקט עם הנתונים המעודכנים
    let updatedStudent = {
        name: name,
        degree: degree,
        mail: mail,
        tel: tel,
        year: year,
        aboutme: aboutme,
        hobbies: hobbies,
        image: picture // וודא שהתמונה הנוכחית נשמרת
    };

    // עדכון הנתונים בפיירבייס באמצעות PATCH
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${id}.json`, {
        method: 'PATCH',  // שימוש ב-PATCH במקום PUT
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStudent)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Profile updated successfully:', data);
        // עדכון הנתונים ב-Local Storage
        localStorage.setItem('userData', JSON.stringify({
            ...userdata,
            ...updatedStudent
        }));
        // מעבר לעמוד הפרופיל לאחר עדכון הפרטים
        window.location.href = 'profile.html';
    })
    .catch(error => {
        console.error('Error updating profile:', error);
    });
}

  window.editProfileData =  editProfileData;