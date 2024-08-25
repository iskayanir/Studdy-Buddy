window.handleClick = handleClick;

async function loadCoursesDatafromFB(email) {
    var type = "studentsProvidingHelp";
    var studentId = await getStudentIdByEmail(email, type);
    
    console.log(studentId);

    if (studentId && type) {
        return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}/${studentId}.json`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Check if courses exist
                    if (data.courses) {
                        // Iterate over the courses object keys
                        Object.keys(data.courses).forEach(courseId => {
                            console.log(`Course number: ${courseId}`);
                            loadDataCoursesDatafromFB(courseId);
                        });
                    } else {
                        console.log('No courses found for this student.');
                    }
                } else {
                    console.log('No data found for this student.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        console.log('No student ID or user type found.');
    }
}


async function getStudentIdByEmail(email, type) {
    try {
        const response = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/${type}.json`);
        const data = await response.json();
        for (let key in data) {
            let student = data[key];
            if (student.mail === email) {
                return key; // Return the student ID
            }
        }
        return null; // Return null if the email is not found
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


function loadDataCoursesDatafromFB(idcourse) {
    fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/courses/${idcourse}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const courseName = data["Course Name"];
                const lectureName = data["Lacture Name"];
                const department = data["Department"];
                console.log(`Course Name: ${courseName}`);
                console.log(`Lecture Name: ${lectureName}`);
                console.log(`Department: ${department}`);
                coursesinhtml(idcourse,courseName,lectureName,department )
            } else {
                console.log('No data found for this course.');
            }
        })
        .catch(error => {
            console.error('Error fetching course data:', error);
        });
}

function coursesinhtml(idcourse, courseName, lectureName, department) {
    var coursebutton = document.getElementById("courses_buttons");

    // Create a new button element
    var button = document.createElement("button");
    button.id = idcourse;
    button.className = "bluck";
    button.innerHTML = `<i class="bi bi-book"></i> ${idcourse} - ${courseName}`;

    // Attach the onclick event dynamically
    button.setAttribute('onclick', `coursebuttondo(${JSON.stringify(idcourse)}, 
                            ${JSON.stringify(courseName)}, 
                            ${JSON.stringify(lectureName)}, 
                            ${JSON.stringify(department)})`);

    // Append the button to the courses_buttons container
    coursebutton.appendChild(button);
}

function coursebuttondo(idcourse, courseName, lectureName, department) {
    var courseContent = document.getElementById('course-content');
    if (courseContent){
        // Remove all child elements
        while (courseContent.firstChild) {
            courseContent.removeChild(courseContent.firstChild);
    }
    // let button = document.getElementById(idcourse);
    // button.style.backgroundColor =  '#334999'; // צבע רקע כחול
    // button.style.color = 'white'; // צבע טקסט לבן

    // Select the parent element
    const parentElement = document.querySelector('.course-content');

    // Check if the element exists
    if (parentElement) {
    // Remove all child elements
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    }

    // צור את המידע שאתה רוצה להכניס
    var coursetitle = document.getElementById("coursedata");
    coursetitle.innerHTML =  department + " - " +
                             courseName + '/ ' +
                             lectureName;
    var currentcourse = document.getElementById("idcurrentcourse")
    currentcourse.innerHTML = idcourse
    console.log(currentcourse.textContent)

    var userData = JSON.parse(localStorage.getItem('userData'));
    var email = userData.email || '';
    console.log(email)
    showrequests(idcourse)
//     searchRequests(email, idcourse).then(matchingRequests => {
//         if (matchingRequests) {
//             console.log('Matching requests:', matchingRequests);
//         } else {
//             console.log('No requests matched the criteria.');
//        }
    
//     });
                                
}

}

function showrequests(idcourse){
    console.log(`Searching for requests with IDcourse: ${idcourse}`);
    return fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
        .then(response => response.json())
        .then(data => {
            let matchingRequests = [];

            // בדיקה בתוך בקשות
            if (data) {
                for (let key in data) {
                    const request = data[key];
                    console.log(request);
                    if (request.id_course === String(idcourse)) {
                        matchingRequests.push({
                            requestId: key,
                            ...request
                        });
                        console.log(`Matching request found: ${JSON.stringify(request)}`);
                        var typehelp = request.type;
                        var topic = request.topic;
                        var status = request.status_request;
                        var requestId = key; // Use the request ID for the next steps
                        console.log(typehelp, topic, status, requestId);
                        if (status !== "approved") {
                            if(request.date){
                                var date = request.date;
                                createAndAppendNewItem(typehelp, topic, status, date, requestId, idcourse);
                            } else {
                                createAndAppendNewItem(typehelp, topic, status, null, requestId, idcourse);
                            }}
                    }
                }
            }

            if (matchingRequests.length === 0) {
                console.log('No matching requests found');
                return null;
            }
            return matchingRequests;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}

function showapprovedrequest() {
    var coursetitle = document.getElementById("coursedata");
    coursetitle.innerText =  "כל הבקשות שאישרתי";

    var courseContent = document.getElementById('course-content');
    if (courseContent){
        // Remove all child elements
        while (courseContent.firstChild) {
            courseContent.removeChild(courseContent.firstChild);
    }}
    
    // השגת המייל של המשתמש הנוכחי
    var userData = JSON.parse(localStorage.getItem('userData')); 
    var email = userData.email || '';
    console.log(email)

    // בקשת כל ה-requests מ-Firebase
    fetch('https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests.json')
        .then(response => response.json())
        .then(data => {
            // מעבר על כל הבקשות
            for (var requestId in data) {
                if (data.hasOwnProperty(requestId)) {
                    var request = data[requestId];
                    console.log(requestId)
                    // בדיקה אם יש מפתח בשם "id_seller_approved" ואם התוכן שלו זהה למייל של המשתמש
                    if (request.mail_seller_approved && request.mail_seller_approved === email) {
                        var typehelp = request.type;
                        var topic = request.topic;
                        var status = request.status_request;
                        var idcourse = request.id_course
                        // var requestId = request; // Use the request ID for the next steps
                        console.log(typehelp, topic, status, requestId);
                        console.log("התנאים מתקיימים עבור הבקשה עם ה-ID:", requestId);
                        if (typehelp === "sicom"){
                            var date = request.date;
                            createAndAppendNewItem(typehelp, topic, status, date, requestId, idcourse);
                        } else {
                            createAndAppendNewItem(typehelp, topic, status, null, requestId, idcourse);

                        }
                    }
                }
            }
        })
        .catch(error => {
            console.error("שגיאה בקבלת הבקשות מ-Firebase:", error);
        });
}

async function createAndAppendNewItem(typehelp, topic, status, date = null, requestId, idcourse) {
    console.log(requestId);

    // Create new item element
    var newItem = document.createElement('div');
    newItem.className = 'item';

    // Determine icon based on the type of help
    var iconClass = '';
    if (typehelp === "sicom") {
        iconClass = 'bi bi-sticky'; // Example icon for 'sicom'
    } else if (typehelp === "hashlama") {
        iconClass = 'bi bi-journal-text'; // Example icon for 'hashlama'
    } else {
        iconClass = 'bi bi-journal-check'; // Example icon for 'ezra'
    }

    // Fetch course name from Firebase
    async function fetchCourseName() {
        try {
            const response = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/courses/${idcourse}.json`);
            const data = await response.json();
            if (data) {
                return data["Course Name"];
            } else {
                console.log('No data found for this course.');
                return 'Unknown Course'; // Fallback in case of no data
            }
        } catch (error) {
            console.error('Error fetching course data:', error);
            return 'Unknown Course'; // Fallback in case of an error
        }
    }

    // Get course name and update the newItem
    const courseName = await fetchCourseName();

    // Set the content of the new item based on the status
    if (status === "approved") {
        newItem.innerHTML = `
            <i class="${iconClass} icon"></i>
            <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
            <ul>
                <li class="topic"> קורס - ${idcourse} </li>
                <li class="topic">${courseName}</li>
                <li class="topic">${topic}</li>
                ${typehelp === 'sicom' && date ? `<li class="date">תאריך סיכום: ${date}</li>` : ''}
            </ul>
            <button class="help-approve-button">פרטים של הסטודנט!</button>
        `;

        newItem.querySelector('.help-approve-button').addEventListener('click', async function () {
            console.log('Click event triggered');
            const studentDetails = await getBuyerOfRequest(requestId);
            alert(`פרטי הקשר של ${studentDetails.name}:\n\nביוגרפיה: ${studentDetails.bio}\n\nטלפון: ${studentDetails.phone}\nאימייל: ${studentDetails.email}`);
        });
    } else {
        newItem.innerHTML = `
            <i class="${iconClass} icon"></i>
            <h2 class="type-help">${typehelp === 'sicom' ? 'סיכום' : typehelp === 'hashlama' ? 'השלמת נושא' : 'עזרה בתרגיל בית'}</h2>
            <ul>
                <li class="topic">${topic}</li>
                ${typehelp === 'sicom' && date ? `<li class="date">תאריך סיכום: ${date}</li>` : ''}
            </ul>
            <button class="help-button">אני רוצה לעזור!</button>
        `;

        newItem.querySelector('.help-button').addEventListener('click', async function () {
            console.log('Click event triggered');
            try {
                const studentDetails = await getBuyerOfRequest(requestId);
                alert(`פרטי הקשר של ${studentDetails.name}:\n\nביוגרפיה: ${studentDetails.bio}\n\nטלפון: ${studentDetails.phone}\nאימייל: ${studentDetails.email}`);

                const IdSeller = localStorage.getItem('GlobalStudentID');
                const fromName = await getNameSeller(IdSeller);
                const sellerData = JSON.parse(localStorage.getItem('userData'));
                const mailSeller = sellerData.email;
                const telSeller = await getTelSeller(IdSeller);
                const message = `I can help you! This is my mail: ${mailSeller} and my phone: ${telSeller}`;
                
                console.log(`${studentDetails.email} מייל`);
                // sendEmail(studentDetails.email, studentDetails.name, fromName, message, mailSeller);

                // Update the status and add id_seller_approved in Firebase
                const updateData = {
                    status_request: "approved",
                    mail_seller_approved: mailSeller,
                    id_seller_approved: IdSeller
                };

                fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Status updated and seller approved in Firebase:', data);
                    alert("הבקשה עברה לתקיה 'בקשות מאושרות'");
                    newItem.remove();  // Remove the item from the DOM
                })
                .catch(error => {
                    console.error('Error updating Firebase:', error);
                });

            } catch (error) {
                console.error('Error fetching student details:', error);
                alert('לא ניתן להציג את פרטי הסטודנט.');
            }
        });
    }

    // Append the new item to course-content
    var courseContent = document.getElementById('course-content');
    courseContent.appendChild(newItem);
}



async function getNameSeller(IdSeller) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsProvidingHelp/${IdSeller}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                return data.name; // מחזיר את השם של הסטודנט
            } else {
                console.log("No student found for this ID");
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            return null;
        });
}

async function getTelSeller(IdSeller) {
    return fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsProvidingHelp/${IdSeller}.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                return data.tel; // מחזיר את השם של הסטודנט
            } else {
                console.log("No student found for this ID");
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            return null;
        });
}


    // var firstChild = courseContent.firstChild; // Get the first child element
    // if (firstChild) {
    //     courseContent.insertBefore(newItem, firstChild); // Insert newItem before the firstChild
    // } else {
    //     courseContent.appendChild(newItem); // If no children, just append newItem
    // }




    

    async function getBuyerOfRequest(requestId) {
        try {
            console.log(requestId+ "בקשה")
            // שלב 1: שליפת הבקשה על בסיס ה-ID שלה
            const requestResponse = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/requests/${requestId}.json`);
            const requestData = await requestResponse.json();
    
            if (!requestData || !requestData.id_student) {
                throw new Error('Student ID not found in request');
            }
    
            const studentMail = requestData.id_student;
            const buyerId = await getStudentIdByEmail(studentMail, 'studentsReceivingHelp');

            console.log(studentMail)
            console.log(buyerId)
            // שלב 2: שליפת פרטי הסטודנט על בסיס הסטודנט ID שהתקבל מהבקשה
            const studentResponse = await fetch(`https://study-buddy-d457d-default-rtdb.europe-west1.firebasedatabase.app/student/studentsReceivingHelp/${buyerId}.json`);
            const studentData = await studentResponse.json();
    
            return {
                name: studentData.name || 'לא ידוע',
                bio: studentData.aboutme || 'אין ביוגרפיה זמינה',
                phone: studentData.tel || 'לא זמין',
                email: studentData.mail || 'לא זמין'
            };
        } catch (error) {
            console.error('Error fetching student details:', error);
            throw error;
        }
    }
    

  // import emailjs from '@emailjs/browser';

emailjs.init("3tDwFwbFt57-geFOx");


function sendEmail(toEmail, toName, fromName, message, mailSeller) {
    console.log("מייל נשלח");
    console.log(toEmail, toName, fromName, message)
    console.log(mailSeller)
    emailjs.send("service_7sqzy6r", "template_hpt1elf", {
        email_buyer: toEmail,  // זהו השם שמופיע בטמפלייט שלך
        to_name: toName,
        from_name: fromName,
        message: message,
        email_seller: mailSeller 
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.error('FAILED...', error);
    });
}

